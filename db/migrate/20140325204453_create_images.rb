class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :rental_id
      t.integer :rank
      t.attachment :photo
      t.timestamps
    end
  end
end
