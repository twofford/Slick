class Api::MessagesController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @messages = Message.all
        render 'api/messages/index'
    end

    def create
        @message = Message.new(message_params)
        if @message.save

            message = {
                id: @message.id,
                user_id: @message.user_id,
                channel_id: @message.channel_id,
                body: @message.body,
                created_at: @message.created_at,
                updated_at: @message.updated_at
            }

            ChatChannel.speak(params[:channel_id], message.as_json)

            render 'api/messages/show'

        else
            render json: {errors: @message.errors.full_messages, status: 401}
        end
    end

    def show
        # debugger
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