class Api::MessagesController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @messages = Message.all
    end

    def create
        @message = Message.new(message_params)
        if @message.save
            @channel = Channel.find_by(params[:channel_id])
            ChatChannel.broadcast_to @channel @message
        else
            render json: {errors: @message.errors.full_messages, status: 401}
        end
    end

    def show
        @message = Message.find(params[:id])
    end

    def update
        @message = Message.find(params[:id])
        if @message.update(message_params)
        else
            render json: {errors: @message.errors.full_messages, status: 422}
        end
    end

    def message_params
        params.require(:message).permit(:user_id, :channel_id, :body)
    end

end