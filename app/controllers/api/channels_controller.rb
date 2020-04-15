class Api::ChannelsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @channels = Channel.all.includes(:users, :messages)
        render 'api/channels/index'
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save && @channel.channel_type == 'public'
            @channel.users << User.all
            render 'api/channels/show'
        elsif @channel.save && @channel.channel_type == 'private'
            @channel.users << User.all #fix this so not all users gets added to private channels
            render 'api/channels/show'
        else
            render json: {errors: @channel.errors.full_messages, status: 422}
        end
    end

    def show
        @channel = Channel.find(params[:id])
        render 'api/channels/show'
    end

    def update
        @channel = Channel.find(params[:id])
        if @channel.update(channel_params)
        else
            render json: {errors: @channel.errors.full_messages, status: 422}
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        @channel.destroy
    end

    def channel_params
        params.require(:channel).permit(:title, :channel_type, :description, :topic, :user_id)
    end

end