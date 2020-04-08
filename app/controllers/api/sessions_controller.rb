class Api::SessionsController < ApplicationController

    #FIX - REMOVE
    skip_before_action :verify_authenticity_token

    def create
        debugger
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password])
        if @user
            login(@user)
            render 'api/users/show'
        else
            render json: ["Invalid Username or Password"], status: 401
        end
    end

    def destroy
        @user = current_user
        if @user
            logout!
            #render or redirect once frontend routes are established
        else
            render json: ["No user currently logged in"], status: 404
            
        end
        
    end

end
