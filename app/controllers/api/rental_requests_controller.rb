class Api::RentalRequestsController < ApplicationController
  before_action :get_rental_request, only: [:approve, :show, :deny, :update, :destroy]

  def create
    @rental_request = current_user.made_rental_requests.new(rental_request_params)
    @rental_request.start_date = DateTime.strptime(rental_request_params[:start_date], "%m/%d/%Y")
    @rental_request.end_date = DateTime.strptime(rental_request_params[:end_date], "%m/%d/%Y")
    owner_id = Rental.find(@rental_request.rental_id).owner_id
    if(owner_id == current_user.id)
      render json:  ["Can't send request to yourself"] , status: :unprocessable_entity
    elsif @rental_request.save
      render json: @rental_request
    else
      render json: @rental_request.errors.full_messages, status: :unprocessable_entity
    end
  end

  def approve
    owner_id = Rental.find(@rental_request.rental_id).owner.id
    if owner_id == current_user.id
      @rental_request.approve!
      render json: @rental_request
    else
      render json: ["You have no power here"], status: 402
    end
  end

  def show
    @rental_request = RentalRequest.find(params[:id])
    render json: @rental_request.to_json(include: :messages)
  end

  def deny
    owner_id = Rental.find(@rental_request.rental_id).owner.id
    if owner_id == current_user.id
      @rental_request.deny!
      render json: @rental_request
    else
      render json: ["You have no power here"]
    end
  end

  def update
    @rental_request = RentalRequest.find
  end

  def destroy
    if @rental_request.user_id == current_user.id
      @rental_request.destroy
      render json: @rental_request
    else
      render json: ["You have no power here"], status: 402
    end
  end

  private
  def rental_request_params
    params.require(:rental_request).permit(:start_date, :end_date, :rental_id, :guests)
  end

  def get_rental_request
    @rental_request = RentalRequest.find(params[:id])
  end
end
