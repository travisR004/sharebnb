class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      login!
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Credentials"]
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
