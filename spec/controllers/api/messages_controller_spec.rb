require "rails_helper"

module Api

  RSpec.describe MessagesController, type: :controller do

    render_views

    let(:channel) { FactoryBot.create(:channel) }
    let!(:messages) { FactoryBot.create_list(:message, 3, channel_id: channel.id) }
    let(:message) { FactoryBot.create(:message) }
    let(:user) { FactoryBot.create(:user) }

    describe "class" do
      it "inherits from the ApplicationController" do
        expect(described_class.superclass).to eq(ApplicationController)
      end
    end

    describe "methods" do
      
      describe "index" do

        it "returns the correct number of messages" do
          get :index, params: { channel_id: channel.id }
          response_to_json = JSON.parse(response.body)
          expect(response_to_json.length).to eq(3)
        end
      end

      describe "create" do
        context "when passed valid message_params" do

          it "persists a new message to the database" do
            expect { post :create, params: { message: { user_id: user.id, channel_id: channel.id, body: "This is a message" } } }.to change { Message.count }.by(1)
          end

          it "has http status 200" do
            post :create, params: { message: { user_id: user.id, channel_id: channel.id, body: "This is a message" } }
            expect(response).to have_http_status(200)
          end

          it "returns the message" do
            post :create, params: { message: { user_id: user.id, channel_id: channel.id, body: "This is a new message" } }
            response_to_json = JSON.parse(response.body).deep_symbolize_keys
            expect(response_to_json[:body]).to eq("This is a new message")

          end
        end

        context "when passed invalid message_params" do
          before do
            post :create, params: { message: { user_id: nil, channel_id: nil, body: "This is an invalid message" } }
          end

          it "has http status 400" do
            expect(response).to have_http_status(400)
          end

          it "renders errors" do
            expect(response.body).to include("User must exist")
            expect(response.body).to include("Channel must exist")
          end
        end
      end

      describe "update" do
        context "when passed valid message_params" do
          before(:each) do
            patch :update, params: { id: message.id, message: { user_id: user.id, channel_id: channel.id, body: "This is an updated message" } }
          end

          it "updates the message" do
            old_message = message.dup
            message.reload
            expect(message.body).not_to eq(old_message.body)
          end
        end

        context "when passed invalid message_params" do
          before do
            patch :update, params: { id: message.id, message: { user_id: nil, channel_id: nil, body: "This is an invalid message" } }
          end

          it "has http status 400" do
            expect(response).to have_http_status(400)
          end

          it "renders errors" do
            expect(response.body).to include("User must exist")
            expect(response.body).to include("Channel must exist")
          end
        end
      end
    end
  end
end