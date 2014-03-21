class Api::RentalsController < ApplicationController

  def create
    @rental = current_user.rentals.new(rental_params)

    if @rental.save
      render json: @rental
    else
      flash.now[:errors] = @rental.errors.full_messages
      render json: @rental, status: :unprocessable_entity
    end
  end

  def show
    @rental = Rental.find(params[:id])
    render json: @rental
  end

  private
  def rental_params
    params.require(:rental).permit(:rental_type,
                                   :room_type,
                                   :unit,
                                   :address,
                                   :description,
                                   :zipcode,
                                   :price,
                                   :allowed_guests)
  end
end
