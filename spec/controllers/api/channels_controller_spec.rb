require "rails_helper"

module Api

  RSpec.describe ChannelsController, type: :controller do

    let(:channel) { FactoryBot.create(:channel) }
    let!(:user) { FactoryBot.create(:user) }
    let!(:users) { FactoryBot.create_list(:user, 3) }

    let(:public_channel_params) {{
      channel: {
      title: "My Channel",
      channel_type: "public",
      description: "It's all about me",
      channel_or_dm: "channel",
      }
    }}

    let(:private_channel_params) {{
      channel: {
        title: "My Private Channel",
        channel_type: "private",
        description: "It's a private channel",
        channel_or_dm: "channel",
      }
    }}

    let!(:dm_params) {{
      channel: {
        title: "A very secret channel",
        channel_type: "private",
        description: "A private DM",
        channel_or_dm: "dm",
        users: users,
      }
    }}

    let(:invalid_params) {{
      channel: {
        Title: nil,
        channel_type: nil,
        description: nil,
        channel_or_dm: nil,
      }
    }}
    
    describe "class" do
      it "inherits from the ApplicationController" do
        expect(described_class.superclass).to eq(ApplicationController)
      end
    end

    describe "methods" do
      
      describe "index" do
        it "assigns @channels" do
          get :index
          expect(assigns(:channels)).to eq([channel])
        end
        it "renders the index template" do
          get :index
          expect(response).to render_template("api/channels/index.json.jbuilder")
        end
      end

      describe "create" do
        context "when passed valid public channel params" do
          it "creates a new channel" do
            expect { post :create, params: public_channel_params }.to change { Channel.count }.by(1)
          end

          it "returns a 200 http status" do
            post :create, params: public_channel_params
            expect(response).to have_http_status(200)
          end

          it "renders the show template" do
            post :create, params: public_channel_params
            expect(response).to render_template("api/channels/show.json.jbuilder")
          end
        end

        context "when passed valid private channel params" do
          before do
            allow_any_instance_of(described_class.superclass).to receive(:current_user).and_return(user)
          end
          it "creates a new channel" do
            expect { post :create, params: private_channel_params }.to change { Channel.count }.by(1)
          end

          it "returns a 200 http status" do
            post :create, params: private_channel_params
            expect(response).to have_http_status(200)
          end

          it "returns the show template" do
            post :create, params: private_channel_params
            expect(response).to render_template("api/channels/show.json.jbuilder")
          end
        end

        context "when passed valid dm params" do
          it "creates a new channel" do
            expect { post :create, params: dm_params }.to change { Channel.count }.by(1)
          end
        end

        context "when passed invalid params" do
          it "does not create a new channel" do
            expect { post :create, params: invalid_params}.not_to change { Channel.count }
          end

          it "returns a 422 http status" do
            post :create, params: invalid_params
            expect(response).to have_http_status(422)
          end
        end
      end
    end
  end
end