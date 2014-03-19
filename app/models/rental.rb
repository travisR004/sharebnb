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
#

class Rental < ActiveRecord::Base
end
