class Api::MessagesController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @messages = Message.where(channel_id: params[:channel_id])
        render :index
    end

    def create
        @message = Message.new(message_params)
        @message.channel_id = params[:channel_id]
        @message.user_id = current_user.id

        if @message.save
            message = {
                id: @message.id,
                user_id: @message.user_id,
                channel_id: @message.channel_id,
                body: @channel.body,
                created_at: @channel.created_at,
                updated_at: @channel.updated_at
            }

            ChatChannel.speak(params[:channel_id], message.as_json)

            render :show
        else
            render json: {errors: @message.errors.full_messages, status: 404}
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