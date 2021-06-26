require "rails_helper"

module Api

  RSpec.describe UsersController, type: :controller do

    let(:user) { FactoryBot.create(:user) }
    let(:params) { { user: { email: "test@example.com", password: "Starwars", online_status: nil } } }
    let(:invalid_params) { { user: { email: nil, password: nil, online_status: nil } } }
    
    describe "class" do
      it "inherits from the Application Controller" do
        expect(described_class.superclass).to eq(ApplicationController)
      end
    end #class

    describe "methods" do
      
      describe "index" do

        before do
          user
        end
        
        it "returns all users" do
          get :index
          response_body = JSON.parse(response.body)
          expect(response_body.length).to eq(1)
        end
      end

      describe "create" do

        before do
          user
          params
        end

        context "when passed valid params" do
          
          it "creates a new user" do
            expect { post :create, params: params }.to change { User.count }.by(1)
          end

          it "returns http status 200" do
            post :create, params: params
            expect(response).to have_http_status(200)
          end

          it "returns the user as json" do
            post :create, params: params
            response_body = JSON.parse(response.body).deep_symbolize_keys
            expect(response_body[:email]).to eq("test@example.com")

          end
        end

        context "when passed invalid params" do

          before do
            invalid_params
          end
          
          it "does not create a new user" do
            expect { post :create, params: invalid_params }.not_to change { Channel.count }
          end

          it "returns http status 400" do
            post :create, params: invalid_params
            expect(response).to have_http_status(400)
          end
        end
        
      end

      describe "show" do          
        
        it "returns http status 200" do
          get :show, params: { id: user.id }
          expect(response).to have_http_status(200)
        end

        it "returns the user as josn" do
          get :show, params: { id: user.id }
          response_body = JSON.parse(response.body).deep_symbolize_keys
          expect(response_body[:id]).to eq(user.id)
        end
      end
    end
  end
end
