class Addpricetorental < ActiveRecord::Migration
  def change
    add_column :rentals, :price, :integer
  end
end
