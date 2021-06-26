require "rails_helper"

RSpec.describe Channel, type: :model do
  
  let(:record) { FactoryBot.create(:channel) }
  let(:other_record) { FactoryBot.create(:channel) }

  describe "class" do
    
    it "inherits from the ApplicationRecord" do
      expect(described_class.superclass).to eq(ApplicationRecord)
    end

    it "has a valid factory" do
      expect(record).to be_valid
    end
  end #class

  describe "attributes" do
    
    describe "title" do
      
      it "can't be nil" do
        record.title = nil
        expect(record).not_to be_valid
      end

      it "must be at least one character long" do
        record.title = ""
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Title is too short (minimum is 1 character)")
      end

      it "must be unique" do
        record.title = other_record.title
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Title has already been taken")
      end
    end

    describe "channel_type" do
      
      it "can't be nil" do
        record.channel_type = nil
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Channel type is not included in the list")
      end

      it "must be public, private or dm" do
        ["public", "private", "dm"].each do |channel_type|
          record.channel_type = channel_type
          expect(record).to be_valid
        end
      end
    end
  end #attributes

  describe "associations" do
    [:channel_memberships, :users, :messages].each do |association|
      it "#{association}" do
        expect(described_class.reflect_on_association(association).macro).to eq(:has_many)
      end
    end
  end #associations
end