class Api::MessagesController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @messages = Message.all
        render 'api/messages/index'
    end

    def create
        @message = Message.new(message_params)
        if @message.save
            ActionCable.server.broadcast "chat", {message: @message}
            render 'api/messages/show'
        else
            render @message.errors.full_messages, status: 422
        end
    end

    def show
        @message = Message.find(params[:id])
        render 'api/messages/show'
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