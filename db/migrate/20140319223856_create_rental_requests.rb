class CreateRentalRequests < ActiveRecord::Migration
  def change
    create_table :rental_requests do |t|
      t.integer :rental_id
      t.integer :user_id
      t.date :start_date
      t.date :end_date
      t.timestamps
    end
  end
end
