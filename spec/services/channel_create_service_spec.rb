require "rails_helper"

module Api

  RSpec.describe ChannelCreateService do
    let!(:user) { FactoryBot.create(:user) }
    let(:public_channel) { FactoryBot.create(:channel) }
    let(:private_channel) { FactoryBot.create(:channel, channel_type: "private") }
    let(:dm_channel) { FactoryBot.create(:channel, channel_type: "dm") }

    let(:service_args) { { channel: public_channel } }
    let(:service) { described_class.new(service_args) }
    let(:private_service) { described_class.new({ channel: private_channel }) }
    let(:dm_service) { described_class.new({ channel: dm_channel, params: { channel: { user_ids: [user.id] } } }) }

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
        context "when passed a public channel" do
          it "creates a channel_membership for each user" do
            expect { service.send(:add_users) }.to change { ChannelMembership.count }.by(1)
          end
        end

        context "when passed a private channel" do
          before do
            def private_service.current_user
            end
            allow(private_service).to receive(:current_user).and_return(user)
          end
          it "creates a channel_membership for the current user" do
            expect { private_service.send(:add_users) }.to change { ChannelMembership.count }.by(1)
          end
        end

        context "when passed a dm" do
          it "creates a channel_membership for each passed user_id" do
            expect { dm_service.send(:add_users) }.to change { ChannelMembership.count }.by(1)
          end
        end
      end

      describe "create_channel_memberships" do
        it "creates a new channel membership for each passed user_id" do
          expect { service.send(:create_channel_memberships, [user.id]) }.to change { ChannelMembership.count }.by(1)
        end
      end
    end #private methods
  end
end