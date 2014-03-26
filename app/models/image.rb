# == Schema Information
#
# Table name: images
#
#  id                 :integer          not null, primary key
#  rental_id          :integer
#  rank               :float
#  photo_file_name    :string(255)
#  photo_content_type :string(255)
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#  created_at         :datetime
#  updated_at         :datetime
#

class Image < ActiveRecord::Base
  validates :rental, :rank, presence: true
  has_attached_file :photo, styles: { medium: "300x300#", large: "800x400#"}
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  belongs_to :rental
end
