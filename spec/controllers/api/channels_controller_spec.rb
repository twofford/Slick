require "rails_helper"

module Api

  RSpec.describe ChannelsController, type: :controller do

    let!(:channel) { FactoryBot.create(:channel) }
    let!(:user) { FactoryBot.create(:user) }
    let!(:users) { FactoryBot.create_list(:user, 3) }
    let!(:channel_memberships) { FactoryBot.create(:channel_membership, user_id: user.id, channel_id: channel.id) }

    let(:public_channel_params) {{
      channel: {
      title: "My Channel",
      channel_type: "public",
      description: "It's all about me",
      channel_or_dm: "channel",
      }
    }}

    let(:valid_updated_params) {{
      id: channel.id,
      channel: {
        title: "My Updated Channel",
      }
    }}

    let(:invalid_updated_params) {{
      id: channel.id,
      channel: {
        title: nil,
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
        users: users.map { |user| user.email },
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

        before do
          allow(controller).to receive(:current_user).and_return(user)
        end

        it "returns the correct number of channels" do
          get :index
          response_to_json = JSON.parse(response.body)
          expect(response_to_json.length).to eq(1)
        end

      end #index

      describe "create" do
        context "when passed valid public channel params" do
          it "creates a new channel" do
            expect { post :create, params: public_channel_params }.to change { Channel.count }.by(1)
          end

          it "returns http status 200" do
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

          it "returns http status 200" do
            post :create, params: private_channel_params
            expect(response).to have_http_status(200)
          end

          it "renders the show template" do
            post :create, params: private_channel_params
            expect(response).to render_template("api/channels/show.json.jbuilder")
          end
        end

        context "when passed valid dm params" do
          before do
            allow_any_instance_of(described_class.superclass).to receive(:current_user).and_return(user)
          end
          it "creates a new channel" do
            expect { post :create, params: dm_params }.to change { Channel.count }.by(1)
          end
        end

        context "when passed invalid params" do
          it "does not create a new channel" do
            expect { post :create, params: invalid_params}.not_to change { Channel.count }
          end

          it "returns http status 422" do
            post :create, params: invalid_params
            expect(response).to have_http_status(422)
          end
        end
      end

      describe "show" do

        context "when passed valid params" do

          before(:each) do
            get :show, params: { id: channel.id }
          end
          
          it "assigns @channel" do
            expect(assigns(:channel)).to eq(channel)
          end

          it "renders the show tempalte" do
            expect(response).to render_template("api/channels/show.json.jbuilder")
          end

          it "returns http status 200" do
            expect(response).to have_http_status(200)
          end
        end

        context "when passed invalid params" do
          it "raises an error" do
            expect {
              get :show,
              id: nil
            }.to raise_error(ArgumentError)
          end
        end
      end

      describe "update" do
        context "when passed valid params" do

          it "assigns @channel" do
            patch :update, params: valid_updated_params
            expect(assigns(:channel)).to eq(channel)
          end

          it "changes the channel" do
            old_channel = channel.dup
            patch :update, params: valid_updated_params
            channel.reload
            expect(channel.title).not_to eq(old_channel.title)
          end
        end

        context "when passed invalid params" do
          it "returns http status 422" do
            patch :update, params: invalid_updated_params
            expect(response).to have_http_status(422)
          end
        end
      end

      describe "destroy" do
        context "when passed invalid params" do
          it "raises an error" do
            expect { delete :destroy, params: { id: nil } }.to raise_error(ActionController::UrlGenerationError)
          end
        end

        context "when passed valid params" do
          it "destroys one record" do
            delete :destroy, params: { id: channel.id }
            expect { channel.reload }.to raise_error(ActiveRecord::RecordNotFound)
          end
        end
      end
    end #end methods
  end
end