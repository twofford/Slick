require "rails_helper"

module Api

  RSpec.describe BroadcastService do

    let(:channel) { "chat" }
    let(:message) { FactoryBot.create(:message) }
    let(:service) { described_class.new({ channel: channel, message: message }) }
    let(:action_cable) { ActionCable.server }
    
    describe "broadcast" do
      it "broadcasts the message" do #TODO: fix this test
        service.send(:broadcast)
        expect_any_instance_of(action_cable).to receive(:broadcast)
      end
    end
  end
end