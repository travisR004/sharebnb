class Addlatlongtorental < ActiveRecord::Migration
  def change
    add_column :rentals, :lat, :float
    add_column :rentals, :long, :float
    remove_column :rentals, :zipcode
  end
end
