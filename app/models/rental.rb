# == Schema Information
#
# Table name: rentals
#
#  id          :integer          not null, primary key
#  owner_id    :integer          not null
#  zipcode     :integer          not null
#  address     :string(255)      not null
#  city        :string(255)      not null
#  state       :string(255)      not null
#  description :string(255)      not null
#  created_at  :datetime
#  updated_at  :datetime
#  unit        :string(255)
#

class Rental < ActiveRecord::Base
  validates :zipcode, :address, :city, :state, description:, presence: true
end
