module Api
    class ChannelsController < ApplicationController

        skip_before_action :verify_authenticity_token

        def index
            channels = Channel.joins(:channel_memberships).includes(:users, :messages).where(channel_memberships: { user_id: current_user.id })

            blueprint = ChannelBlueprint.render(channels)

            render json: blueprint
        end

        def create
            channel = Channel.new(channel_params)

            if channel.save
                ChannelCreateService.new({ channel: channel, params: params }).call

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
