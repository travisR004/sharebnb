# == Schema Information
#
# Table name: rentals
#
#  id             :integer          not null, primary key
#  owner_id       :integer          not null
#  address        :string(255)      not null
#  description    :string(255)      not null
#  created_at     :datetime
#  updated_at     :datetime
#  unit           :string(255)
#  allowed_guests :integer
#  rental_type    :string(255)
#  room_type      :string(255)
#  price          :integer
#  lat            :float
#  long           :float
#

class Rental < ActiveRecord::Base
  validates :address, :description, :price, :lat, :long,
            :rental_type, :room_type, :allowed_guests, :owner, presence: true

  belongs_to :owner, class_name: "User"
  has_many :rental_requests

  def self.get_rentals_by_range(width, zoom, lat, long)
    radius = self.calculate_radius(width, zoom)
    conditions = <<-SQL
      ((lat < :lat_high AND
      lat > :lat_low) AND
      (long < :long_high AND
      long > :long_low))
    SQL
    rentals = Rental.where(conditions, {
      lat_high: lat + radius,
      lat_low: lat - radius,
      long_high: long + radius,
      long_low: long - radius
    })
  end

  def self.calculate_radius(width, zoom)
    radius = ( width * 360 ) / (256 * Math::E ** (zoom * Math.log(2)) * 2)
  end
end
