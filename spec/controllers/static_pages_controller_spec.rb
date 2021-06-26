require "rails_helper"

RSpec.describe StaticPagesController, type: :controller do

  describe "class" do
    
    it "inherits from the Application Controller" do
      expect(described_class.superclass).to eq(ApplicationController)
    end
  end #class

  describe "methods" do
    
    describe "root" do
      
      it "responds to root" do
        expect(controller).to respond_to(:root)
      end
    end
  end #methods
end
