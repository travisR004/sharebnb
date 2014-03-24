# == Schema Information
#
# Table name: messages
#
#  id                :integer          not null, primary key
#  sender_id         :integer
#  receiver_id       :integer
#  content           :text
#  created_at        :datetime
#  updated_at        :datetime
#  rental_request_id :integer
#

class Message < ActiveRecord::Base
  validates :sender_id, :receiver_id, :content, presence: true

  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"
  belongs_to :rental_request
end
