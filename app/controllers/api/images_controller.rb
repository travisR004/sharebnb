class Api::ImagesController < ApplicationController

  def new
    render "/images/new"
  end

  def create
    @image = Image.new(image_params)

    if @image.save
      render json: @image
    else
      render json: @image.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def image_params
    params.require(:image).permit(:rental_id, :rank, :photo)
  end
end
