class AddListingTypeToRental < ActiveRecord::Migration
  def change
    add_column :rentals, :rental_type, :string
  end
end
