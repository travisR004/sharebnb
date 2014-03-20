class AddGuestNumbertoRental < ActiveRecord::Migration
  def change
    add_column :rentals, :allowed_guests, :integer
  end
end
