class Api::ChannelsController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @channels = Channel.all.includes(:users, :messages)
        render 'api/channels/index.json.jbuilder'
    end

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            if @channel.channel_or_dm == 'channel'
                if @channel.channel_type == 'public'
                    @channel.users << User.all
                elsif @channel.channel_type == 'private'
                    @channel.users << current_user
                end
            elsif @channel.channel_or_dm == 'dm'
                params[:channel][:users].each do |user|
                @channel.users << User.find_by(email: user)
            end
            @channel.users << current_user
            end
            render 'api/channels/show.json.jbuilder'
        else
            render json: @channel.errors.full_messages, status: 422
        end
    end

    def show
        @channel = Channel.find(params[:id])
        render 'api/channels/show.json.jbuilder'
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
        params.require(:channel).permit(
            :title,
            :channel_type,
            :description,
            :topic,
            :user_id,
            :channel_or_dm,
            :users => [])
    end

end