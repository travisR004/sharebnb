class Api::FavoriteRentalsController < ApplicationController

  def create
    @favorite_rental = current_user.favorite_rentals.new(favorite_rental_params)
    if @favorite_rental.save
      render json: @favorite_rental
    else
      render json: @favorite_rental.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @favorite_rental = Rental.find(params[:id])
    render json: @favorite_rental
  end

  def destroy
    @favorite_rental = FavoriteRental.find(params[:id])
    @favorite_rental.destroy
    render json: @favorite_rental
  end

  private
  def favorite_rental_params
    params.require(:favorite_rental).permit(:rank, :rental_id)
  end
end
