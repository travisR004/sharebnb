class AddRoomTypeToRental < ActiveRecord::Migration
  def change
    add_column :rentals, :room_type, :string
  end
end
