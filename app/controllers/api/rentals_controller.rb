class Api::RentalsController < ApplicationController

  def create
    @rental = current_user.rentals.new(rental_params)
  end

  private
  def rental_params
    params.require(:rental).permit(:rental_type,
                                   :room_type,
                                   :unit,
                                   :address,
                                   :description,
                                   :allowed_guests)
end
