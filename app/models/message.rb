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
#  read              :boolean          default(FALSE)
#

class Message < ActiveRecord::Base
  validates :sender, :receiver_id, :rental_request_id, :content, presence: true

  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"
  belongs_to :rental_request
end
