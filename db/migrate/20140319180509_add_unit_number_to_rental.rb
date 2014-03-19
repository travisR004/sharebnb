class AddUnitNumberToRental < ActiveRecord::Migration
  def change
    add_column :rentals, :unit, :string
  end
end
