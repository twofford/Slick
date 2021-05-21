module Api
    class MessagesController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        messages = Message.all.where(channel_id: params[:channel_id])
        blueprint = MessageBlueprint.render(messages)
        render json: blueprint
    end

    def create
        message = Message.new(message_params)
        if message.save
            blueprint = MessageBlueprint.render(message)
            render json: blueprint
        else
            render json: message.errors.full_messages, status: 400
        end
    end

    def update
        message = Message.find(params[:id])
        if message.update(message_params)
            blueprint = MessageBlueprint.render(message)
            render json: blueprint
        else
            render json: message.errors.full_messages, status: 400
        end
    end

    def message_params
        params.require(:message).permit(:user_id, :channel_id, :body)
    end

    end
end
