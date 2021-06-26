require "rails_helper"

RSpec.describe User, type: :model do

  let(:record) { FactoryBot.create(:user) }
  let(:other_record) { FactoryBot.create(:user) }

  describe "class" do
    it "inherits from the ApplicationRecord" do
      expect(described_class.superclass).to eq(ApplicationRecord)
    end

    it "has a valid factory" do
      expect(record).to be_valid
    end
  end #class

  describe "attr_readers" do
    describe "password" do
      it "is an attr_reader" do
        expect(described_class.new).to respond_to(:password)
      end
    end
  end #attr_readers

  describe "attributes" do

    describe "email" do

      it "can't be nil" do
        record.email = nil
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Email can't be blank")
      end

      it "must be unique" do
        record.email = other_record.email
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Email has already been taken")
      end
    end

    describe "password_digest" do

      it "can't be nil" do
        record.password_digest = nil
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Password digest can't be blank")
      end
    end

    describe "session_token" do

      it "can't be nil" do
        record.session_token = nil
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Session token can't be blank")
      end

      it "must be unique" do
        record.session_token = other_record.session_token
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Session token has already been taken")
      end
    end

    describe "password" do

      it "can be nil" do
        record.password = nil
        expect(record).to be_valid
      end

      it "can't be shorter than 8 characters" do
        record.password = "abcd"
        expect(record).not_to be_valid
        expect(record.errors.full_messages).to include("Password is too short (minimum is 8 characters)")
      end
    end
    
  end #attributes

  describe "callbacks" do
    
    describe "ensure_session_token" do
      it "calls ensure_session_token when a new User object is initialized" do
        expect_any_instance_of(User).to receive(:ensure_session_token)
        User.new
      end
    end
  end #callbacks

  describe "associations" do
    [:channel_memberships, :channels, :messages].each do |association|
      it "#{association}" do
        expect(described_class.reflect_on_association(association).macro).to eq(:has_many)
      end
    end
  end #associations

  describe "class methods" do

    describe "find_by_credentials" do
      it "returns the user when the password is correct" do
        expect(described_class.find_by_credentials(record.email, record.password)).to eq(record)
      end

      it "returns nil when the password is incorrect" do
        expect(described_class.find_by_credentials(record.email, "StarWars")).to eq(nil)
      end
    end

    describe "generate_session_token" do
      it "generates a 22-character random string" do
        expect(described_class.generate_session_token.length).to eq(22)
        expect(described_class.generate_session_token).to be_a(String)
      end
    end
  end #class methods

  describe "instance methods" do
    
    describe "is_password?" do
      
      it "returns true if the password is correct" do
        expect(record.is_password?(record.password)).to eq(true)
      end

      it "returns false is the password is incorrect" do
        expect(record.is_password?("Starwars")).to eq(false)
      end
    end

    describe "ensure_session_token" do
      
      it "returns the session token if one exists" do
        expect(record.ensure_session_token).to eq(record.session_token)
      end

      it "generates a session token if none exists" do
        record.session_token = nil
        record.ensure_session_token
        expect(record.session_token).to be_truthy
      end
    end

    describe "reset_session_token!" do
      
      it "resets the session token" do
        old_token = record.session_token
        record.reset_session_token!
        expect(record.session_token).not_to eq(old_token)
      end

      it "updates the record" do
        old_record = record.dup
        record.reset_session_token!
        record.reload
        expect(record).not_to eq(old_record)
      end

      it "returns the new session token" do
        expect(record.reset_session_token!).to be_a(String)
        expect(record.reset_session_token!.length).to eq(22)
      end
    end
  end
end
