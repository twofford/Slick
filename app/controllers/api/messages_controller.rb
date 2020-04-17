class Api::MessagesController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @messages = Message.all.includes(:user)
        render 'api/messages/index'
    end

    def create
        #debugger
        @message = Message.new(message_params)
        if @message.save
            @user = User.find_by(id: params[:user_id])
            @channel = Channel.find_by(id: params[:channel_id])
            #debugger

            render 'api/channels/messages/show'

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