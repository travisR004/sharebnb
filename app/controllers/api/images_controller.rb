class Api::ImagesController < ApplicationController

  def new
    render "/images/new"
  end

  def show
    @image = Image.find(params[:id])
    render json: @image
  end

  def update
    @image = Image.find(params[:id])
    if @image.update_attributes(image_params)
      render json: @image
    else
      render json: @image.errors.full_messages
    end
  end

  def create
    @images = []
    params[:image][:photo].each do |photo|
      image = Image.new(image_params)
      image.photo = photo
      if image.save
        @images << image
      else
        render json: @image.errors.full_messages, status: :unprocessable_entity
      end
    end

    render json: @images
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    render json: @image
  end

  private
  def image_params
    params.require(:image).permit(:rental_id, :rank)
  end
end
