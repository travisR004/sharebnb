# == Schema Information
#
# Table name: rentals
#
#  id             :integer          not null, primary key
#  owner_id       :integer          not null
#  zipcode        :integer          not null
#  address        :string(255)      not null
#  description    :string(255)      not null
#  created_at     :datetime
#  updated_at     :datetime
#  unit           :string(255)
#  allowed_guests :integer
#  rental_type    :string(255)
#  room_type      :string(255)
#

class Rental < ActiveRecord::Base
  validates :zipcode, :address, :city, :state, :description,
            :rental_type, :room_type, presence: true

  belongs_to :owner, class_name: "User"
  has_many :rental_requests
end
