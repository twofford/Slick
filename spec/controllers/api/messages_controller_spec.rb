require "rails_helper"

module Api

  RSpec.describe MessagesController, type: :controller do

    let(:messages) { FactoryBot.create_list(:message, 3) }
    let(:message) { FactoryBot.create(:message) }
    let(:user) { FactoryBot.create(:user) }
    let(:channel) { FactoryBot.create(:channel) }

    describe "class" do
      it "inherits from the ApplicationController" do
        expect(described_class.superclass).to eq(ApplicationController)
      end
    end

    describe "methods" do
      
      describe "index" do

        before(:each) do
          get :index
        end

        it "assigns @messages" do
          expect(assigns(:messages)).to eq(messages)
        end

        it "renders the index template" do
          expect(response).to render_template("api/messages/index.json.jbuilder")
        end
      end

      describe "create" do
        context "when passed valid params" do

          it "creates a new message" do
            expect { post :create, params: { message: { user_id: user.id, channel_id: channel.id, body: "This is a message" } } }.to change { Message.count }.by(1)
          end

          it "returns http status 200" do
            post :create, params: { message: { user_id: user.id, channel_id: channel.id, body: "This is a message" } }
            expect(response).to have_http_status(200)
          end

          it "renders the show template" do
            post :create, params: { message: { user_id: user.id, channel_id: channel.id, body: "This is a message" } }
            expect(response).to render_template("api/messages/show.json.jbuilder")
          end

          #TODO: test that ActionCable is being called
        end

        context "when passed invalid params" do
          before do
            post :create, params: { message: { user_id: nil, channel_id: nil, body: nil } }
          end

          it "renders an errors hash" do
            expect(response).to eq("User must exist")
          end
        end
      end

      describe "show" do
        context "when passed a valid message id" do
          before(:each) do
            get :show, params: { id: message.id }
          end

          it "assigns @message" do
            expect(assigns(:message)).to eq(message)
          end

          it "returns http status 200" do
            expect(response).to have_http_status(200)
          end

          it "renders the show template" do
            expect(response).to render_template("api/messages/show.json.jbuilder")
          end
        end

        context "when passed an invalid message id" do
          it "raises an error" do
            expect {
              get :show,
              id: nil
            }.to raise_error(ArgumentError)
          end
        end
      end

      describe "update" do
        context "when passed a valid channel id" do
          before(:each) do
            patch :update, params: { id: message.id, message: { user_id: user.id, channel_id: channel.id, body: "Updated message" } }
          end

          it "assigns @message" do
            expect(assigns(:message)).to eq(message)
          end

          it "updates the message" do
            old_message = message.dup
            message.reload
            expect(message.body).not_to eq(old_message.body)
          end
        end

        context "when passed an invalid channel id" do
          it "raises an error" do
            expect { patch :update, params: { id: nil } }.to raise_error(ActionController::UrlGenerationError)
          end
        end
      end
    end
  end
end