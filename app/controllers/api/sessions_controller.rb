class Api::SessionsController < ApplicationController

    #TEST
    skip_before_action :verify_authenticity_token

    def create
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password])
        if @user
            login(@user)
            render 'api/users/show'
        else
            render json: ["Invalid email or password"], status: 401
        end
    end

    def destroy
        @user = current_user
        if @user
            logout!
        else
            render json: ["No user currently logged in"], status: 404
            
        end
        
    end

end
