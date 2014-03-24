class Api::MessagesController < ApplicationController
  def create
    @message = current_user.sent_messages.new(message_params)
    if @message.save
      render json: @message
    else
      render json: @message.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @message = Message.find(params[:id])
    if @message.update_attributes(update_params)
      render json: @message
    else
      render json: @message.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def message_params
    params.require(:message).permit(:receiver_id, :content, :sender_view, :receiver_view)
  end

  def update_params
    params.require(:message).permit(:sender_view, :receiver_view)
end
