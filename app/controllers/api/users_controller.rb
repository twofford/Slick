class Api::UsersController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        users = User.all
        
        blueprint = UserBlueprint.render(users)

        render json: blueprint
    end
    
    def create
        user = User.new(user_params)

        if user.save
            Channel.all.each do |channel|
                ChannelMembership.create(user_id: user.id, channel_id: channel.id)
            end

            login(user)

            blueprint = UserBlueprint.render(user)

            render json: blueprint
        else
            render json: user.errors.full_messages, status: 400
        end
    end

    def show
        user = User.find(params[:id])

        blueprint = UserBlueprint.render(user)

        render json: blueprint
    end

    def user_params
        params.require(:user).permit(:email, :password, :online_status, :id)
    end
    
end
