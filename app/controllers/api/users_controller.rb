class Api::UsersController < ApplicationController

    #FIX - REMOVE
    skip_before_action :verify_authenticity_token

    def index
        @users = User.all
        #render or redirect once frontend routes are established
    end
    
    def create
        
        @user = User.new(user_params)
        if @user && @user.save!
            login(@user)
            render 'api/users/show'
        else
            render json: {errors: @user.errors.full_messages, status: 401}
        end
    end

    def show
        
        @user = User.find(params[:id])
        #render or redirect once frontend routes are established
    end

    def update
        
        @user = User.find(params[:id])
        if @user.update(user_params)
            #render or redirect once frontend routes are established
        else
            render json: {errors: @user.errors.full_messages, status: 422}
        end
    end

    def destroy
        
        @user = User.find(params[:id])
        @user.destroy
        #render or redirect once frontend routes are established
    end

    def user_params
        params.require(:user).permit(:email, :password)
    end

end
