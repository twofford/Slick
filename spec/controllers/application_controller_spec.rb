require "rails_helper"

RSpec.describe ApplicationController, type: :controller do

  let(:general_channel) { FactoryBot.create(:channel, title: "General") }
  let(:user) { FactoryBot.create(:user) }
  
  describe "class" do
    it "inherits from the ActionController" do
      expect(described_class.superclass).to eq(ActionController::Base)
    end
  end #class

  describe "methods" do
    
    describe "general_channel" do

      before do
        general_channel
      end

      it "returns the channel titled 'General'" do
        expect(controller.general_channel).to eq(general_channel)
      end
    end

    describe "current_user" do

      before do
        user
      end
      
      it "returns the current user" do
        session[:session_token] = user.session_token
        expect(controller.current_user).to eq(user)
      end
    end

    describe "ensure_logged_in" do #not sure how to test this
    end

    describe "login" do
      
      it "resets the session token" do
        old_token = User.generate_session_token
        controller.login(user)
        expect(session[:session_token]).not_to eq(old_token)
      end

      it "returns the logged-in user" do
        expect(controller.login(user)).to eq(user)
      end
    end

    describe "logout!" do

      before do
        allow(controller).to receive(:current_user).and_return(user)
      end
      
      it "resets the current user's session token" do
        old_token = user.session_token.dup
        controller.logout!
        expect(user.session_token).not_to eq(old_token)
      end

      it "sets the session token to nil" do
        session[:session_token] = User.generate_session_token
        controller.logout!
        expect(session[:session_token]).to eq(nil)
      end

      it "returns nil" do
        expect(controller.logout!).to eq(nil)
      end
    end

    describe "logged_in?" do
      
      context "when there is a current user" do
        before do
          allow(controller).to receive(:current_user).and_return(user)
        end

        it "returns true" do
          expect(controller.logged_in?).to eq(true)
        end
      end

      context "when there isn't a current user" do
        before do
          allow(controller).to receive(:current_user).and_return(nil)
        end

        it "returns false" do
          expect(controller.logged_in?).to eq(false)
        end
      end
    end
  end #methods
end