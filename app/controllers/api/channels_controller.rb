class Api::ChannelsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @channels = Channel.all
        #render or redirect once you know what you're doing
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel && @channel.save!
            #render or redirect once you know what you're doing
        else
            render json: {errors: @channel.errors.full_messages, status: 401}
        end
    end

    def show
        @channel = Channel.find(params[:id])
        #render or redirect once you know what you're doing
    end

    def update
        @channel = Channel.find(params[:id])
        if @channel.update(channel_params)
        #render or redirect once you know what you're doing
        else
            render json: {errors: @channel.errors.full_messages, status: 422}
        end
    end

    def destroy
        @channel = Channel.find(params[:id])
        @channel.destroy
        #render or redirect once you know what you're doing
    end

    def channel_params
        params.require(:channel).permit(:title, :channel_type, :description, :topic, :user_id)
    end

end