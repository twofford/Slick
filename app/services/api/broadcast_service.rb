module Api
  class BroadcastService

    attr_reader :channel, :message

    def initialize(args = {})
      @channel = args[:channel]
      @message = args[:message]
    end

    def call
      broadcast
    end

    private

    def broadcast
      ActionCable.server.broadcast(channel, :message => { message.id => message })
    end
  end
end