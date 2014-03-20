class RemoveColumnsFromRental < ActiveRecord::Migration
  def change
    remove_column :rentals, :city
    remove_column :rentals, :state
  end
end