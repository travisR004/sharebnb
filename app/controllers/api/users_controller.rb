class Api::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: @user
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user.to_json(include: [:made_rental_requests,
                                         :received_rental_requests,
                                         :rentals,
                                         :received_messages,
                                         :sent_messages
                                         ])
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
