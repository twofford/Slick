class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if @user
            login(@user)
            #render or redirect once frontend routes are established
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
