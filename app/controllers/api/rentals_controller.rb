class Api::RentalsController < ApplicationController

  def rental_range
    zoom = params[:zoom].to_i
    width = params[:width].to_i
    lat = params[:lat].to_f
    long = params[:long].to_f
    min_price = params[:min_price].to_i
    max_price = params[:max_price].to_i
    room_types = params[:room_types]
    @rentals = Rental.get_rentals_by_range(width, zoom, lat, long, min_price, max_price, room_types);
    render "rentals/results"
  end

  def create
    @rental = current_user.rentals.new(rental_params)
    if @rental.save
      render json: @rental
    else
      render json: @rental.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @rental = Rental.find(params[:id])
    render "rentals/show"
  end

  def update
    @rental = Rental.find(params[:id])
    if @rental.update_attributes(rental_params) && @rental.owner_id == current_user.id
      render json: @rental
    else
      render json: @rental.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @rental = Rental.find(params[:id])
    if @rental.owner_id == current_user.id
      @rental.destroy
      render json: @rental
    else
      render json: ["You have no power here"]
    end
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
