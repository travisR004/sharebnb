class Api::RentalRequestsController < ApplicationController

  def create
    @rental_request = current_user.made_rental_requests.new(rental_request_params)
    @rental_request.start_date = DateTime.strptime(rental_request_params[:start_date], "%m/%d/%Y")
    @rental_request.end_date = DateTime.strptime(rental_request_params[:end_date], "%m/%d/%Y")
    if @rental_request.save
      render json: @rental_request
    else
      render json: @rental_request, status: :unprocessable_entity
    end
  end

  def show
  end

  private
  def rental_request_params
    params.require(:rental_request).permit(:start_date, :end_date, :rental_id, :guests)
  end
end