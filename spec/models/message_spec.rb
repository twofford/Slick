require "rails_helper"

RSpec.describe Message, type: :model do
  
  let(:record) { FactoryBot.create(:message) }
  let(:other_record) { FactoryBot.create(:message) }
  let(:user) { FactoryBot.create(:user) }
  let(:channel) { FactoryBot.create(:channel) }

  describe "class" do
    it "inherits from the ApplicationRecord" do
      expect(described_class.superclass).to eq(ApplicationRecord)
    end

    it "has a valid factory" do
      expect(record).to be_valid
    end
  end #class

  describe "attributes" do

    [:user_id, :channel_id, :body].each do |attribute|
      it "#{attribute} can't be nil" do
        record.send("#{attribute}=", nil)
        expect(record).not_to be_valid
      end
    end
  end #attributes

  describe "callbacks" do
    
    describe "broadcast" do
      
      it "calls broadcast when a new message object is created" do
        expect_any_instance_of(described_class).to receive(:broadcast)
        Message.create(user_id: user.id, channel_id: channel.id, body: "This is a message")
      end

      it "calls broadcast when a new message object is updated" do
        expect(record).to receive(:broadcast)
        record.update({ id: record.id, body: "New message" })
      end
    end
  end #callbacks

  describe "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:channel) }
  end #associations

  describe "methods" do
    
    describe "broadcast" do
      
      it "calls the BroadcastService" do
        expect_any_instance_of(Api::BroadcastService).to receive(:call)
        record.broadcast
      end
    end
  end
end
