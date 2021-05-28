module Api
  class ChannelCreateService

    attr_reader :channel, :params, :channel_or_dm, :channel_type

    def initialize(args = {})
      @channel = args[:channel]
      @params = args[:params]
      @channel_or_dm = @channel.channel_or_dm
      @channel_type = @channel.channel_type
    end

    def call
      add_users
    end

    private

    def add_users
      if channel_or_dm == "channel"
        if channel_type == "public"
          create_channel_memberships(User.all)
        else
          create_channel_memberships(current_user)
        end
      else
        create_channel_memberships(params[:users])
      end
    end

    def create_channel_memberships users
      users.each do |user|
        ChannelMembership.create(user_id: user.id, channel_id: channel.id)
      end
    end

  end
end