class Api::UsersController < ApplicationController

    #FIX - REMOVE
    skip_before_action :verify_authenticity_token

    def index
        @users = User.all
    end
    
    def create
        @user = User.new(user_params)
        if @user.save
            @user.channels << Channel.all.where(channel_type: 'public')
            login(@user)
            render 'api/users/show'
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
        else
            render json: {errors: @user.errors.full_messages, status: 422}
        end
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
    end

    def user_params
        params.require(:user).permit(:email, :password)
    end
    
end
