class Api::RentalsController < ApplicationController

  def rental_range
    zoom = params[:zoom].to_i
    width = params[:width].to_i
    lat = params[:lat].to_f
    long = params[:long].to_f
    @rentals = Rental.get_rentals_by_range(width, zoom, lat, long);
    render json: @rentals
  end

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
                                   :lat,
                                   :long,
                                   :tagline,
                                   :price,
                                   :allowed_guests)
  end
end
