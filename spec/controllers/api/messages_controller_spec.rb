require "rails_helper"

module Api

  RSpec.describe MessagesController, type: :controller do

    let(:messages) { FactoryBot.create_list(:message, 3) }

    describe "class" do
      it "inherits from the ApplicationController" do
        expect(described_class.superclass).to eq(ApplicationController)
      end
    end

    describe "methods" do
      
      describe "index" do
        it "assigns @messages" do
          get :index
          expect(assigns(:messages)).to eq([messages])
        end
      end
    end
  end
end