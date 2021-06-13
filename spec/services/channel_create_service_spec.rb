require "rails_helper"

module Api

  RSpec.describe ChannelCreateService do
    let(:public_channel) { FactoryBot.create(:channel) }
    let(:private_channel) { FactoryBot.create(:channel, channel_type: "private") }
    let(:dm_channel) { FactoryBot.create(:channel, channel_type: "dm") }

    let(:service_args) { { channel: channel } }
    let(:service) { described_class.new(service_args) }

    describe "public methods" do

      describe "attr_readers" do

        it "is an attr_reader" do
          expect(service).to respond_to(:channel)
          expect(service).to respond_to(:params)
          expect(service).to respond_to(:channel_type)
        end
      end

      describe "call" do
        
        it "calls add_users" do
          expect(service).to receive(:add_users)
          service.call
        end
      end
    end #public methods

    describe "private methods" do
      
      describe "add_users" do
        #TODO
      end

      describe "create_channel_memberships" do
        #TODO
      end
    end #private methods
  end
end