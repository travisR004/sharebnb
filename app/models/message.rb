# == Schema Information
#
# Table name: messages
#
#  id            :integer          not null, primary key
#  sender_id     :integer
#  receiver_id   :integer
#  content       :text
#  sender_view   :boolean          default(TRUE)
#  receiver_view :boolean          default(TRUE)
#  created_at    :datetime
#  updated_at    :datetime
#

class Message < ActiveRecord::Base
  validates :sender_id, :receiver_id, :content, presence: true

  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"
end
