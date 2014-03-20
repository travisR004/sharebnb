class AddStatusToRentalRequest < ActiveRecord::Migration
  def change
    add_column :rental_requests, :status, :string, default: "PENDING"
  end
end
