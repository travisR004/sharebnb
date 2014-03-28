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
      render json: @user.errors.full_messages, status: 402
    end
  end

  def show
    @user = User.find(params[:id])
    render json: @user.to_json(include: [:made_rental_requests,
                                         :received_rental_requests,
                                         :rentals
                                        ])
  end

  private
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
