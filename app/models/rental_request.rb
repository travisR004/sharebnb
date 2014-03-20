# == Schema Information
#
# Table name: rental_requests
#
#  id         :integer          not null, primary key
#  rental_id  :integer
#  user_id    :integer
#  start_date :date
#  end_date   :date
#  created_at :datetime
#  updated_at :datetime
#  status     :string(255)      default("PENDING")
#

class RentalRequest < ActiveRecord::Base

  validates :user, :rental, :start_date, :end_date, :status, presence: true
  belongs_to :rental
  belongs_to :user
end
