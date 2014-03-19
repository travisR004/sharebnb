class CreateRentals < ActiveRecord::Migration
  def change
    create_table :rentals do |t|
      t.integer :owner_id, null: false
      t.integer :zipcode, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :description, null: false
      t.timestamps
    end
  end
end
