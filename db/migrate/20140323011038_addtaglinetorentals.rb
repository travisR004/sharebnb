class Addtaglinetorentals < ActiveRecord::Migration
  def change
    add_column :rentals, :tagline, :string
  end
end
