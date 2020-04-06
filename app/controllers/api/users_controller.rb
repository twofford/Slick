class Api::UsersController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index
        @users = User.all
        #redirect
    end

    def create
        @user = User.new(user_params)
        if @user && @user.save!
            login(@user)
            #redirect
        else
            render json: {errors: @user.errors.full_messages, status: 401}
        end
    end

    def show
        @user = User.find(params[:id])
        #redirect
    end

    def update
        @user = User.find(params[:id])
        if @user.update(user_params)
            #redirect
        else
            render json: {errors: @user.errors.full_messages, status: 422}
        end
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
        #redirect
    end

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

end
