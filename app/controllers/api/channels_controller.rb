module Api
    class ChannelsController < ApplicationController

        skip_before_action :verify_authenticity_token

        def index
            channels = Channel.joins(:channel_memberships).includes(:users, :messages).where(channel_memberships: { user_id: current_user.id })
            blueprint = ChannelBlueprint.render(channels)
            debugger
            render json: blueprint
        end

        #def create
            #@channel = Channel.new(channel_params)
            #if @channel.save
                #if @channel.channel_or_dm == 'channel'
                    #if @channel.channel_type == 'public'
                        #@channel.users << User.all
                    #elsif @channel.channel_type == 'private'
                        #@channel.users << current_user
                    #end
                #elsif @channel.channel_or_dm == 'dm'
                    #params[:channel][:users].each do |user|
                    #@channel.users << User.find_by(email: user)
                #end
                #@channel.users << current_user
                #end
                #render 'api/channels/show.json.jbuilder'
            #else
                #render json: @channel.errors.full_messages, status: 422
            #end
        #end

        def create
            channel = Channel.new(channel_params)
            #Call channel create service here
            #Service should check if it's public of private. If it's public it should create a new channel_membership for each existing user
            #If it's private, it should create channel_memberships only for the passed users.
            if channel.save
                blueprint = ChannelBlueprint.render(channel)
                render json: blueprint
            else
                render json: channel.errors.full_messages, status: 400
            end
        end

        def update

            @channel = Channel.find(params[:id])
            if @channel.update(channel_params)
                render 'api/channels/show.json.jbuilder'
            else
                render json: @channel.errors.full_messages, status: 422
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
end
