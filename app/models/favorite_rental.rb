# == Schema Information
#
# Table name: favorite_rentals
#
#  id         :integer          not null, primary key
#  rental_id  :integer
#  user_id    :integer
#  rank       :integer
#  created_at :datetime
#  updated_at :datetime
#

class FavoriteRental < ActiveRecord::Base
  validates :user, :rental_id, :rank, presence: true

  belongs_to :user
  belongs_to :rental
end
