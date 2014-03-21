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
#  guests     :integer
#  message    :text
#

class RentalRequest < ActiveRecord::Base
  STATUS_STATES = %w(APPROVED DENIED PENDING)

  before_validation :assign_pending_status

  validates :user, :rental_id, :guests, :start_date, :end_date, presence: true
  validate :does_not_overlap_approved_request

  belongs_to :rental
  belongs_to :user

  def approve!
    raise "not pending" unless self.status == "PENDING"
    transaction do
      self.status = "APPROVED"
      self.save!

      overlapping_pending_requests.each do |req|
        req.status = "DENIED"
        req.save!
      end
    end
  end

  def approved?
    self.status == "APPROVED"
  end

  def denied?
    self.status == "DENIED"
  end

  def pending?
    self.status == "PENDING"
  end

  private
  def assign_pending_status
    self.status ||= "PENDING"
  end

  def overlapping_requests
    conditions = <<-SQL
      ((rental_id = :rental_id)
        AND (start_date < :end_date)
        AND (end_date > :start_date))
    SQL

    overlapping_requests = RentalRequest.where(conditions, {
      rental_id: self.rental_id,
      start_date: self.start_date,
      end_date: self.end_date
    })

    if self.id.nil?
      overlapping_requests
    else
      overlapping_requests.where("id != ?", self.id)
    end
  end

  def overlapping_approved_requests
    overlapping_requests.where("status = 'APPROVED'")
  end

  def overlapping_pending_requests
    overlapping_requests.where("status = 'PENDING'")
  end

  def does_not_overlap_approved_request
    return if self.denied?

    unless overlapping_approved_requests.empty?
      errors[:base << "Request conflicts with existing approved request"]
    end
  end

end




















