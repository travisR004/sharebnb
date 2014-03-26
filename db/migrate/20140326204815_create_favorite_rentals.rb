class CreateFavoriteRentals < ActiveRecord::Migration
  def change
    create_table :favorite_rentals do |t|
      t.integer :rental_id
      t.integer :user_id
      t.integer :rank

      t.timestamps
    end
  end
end
