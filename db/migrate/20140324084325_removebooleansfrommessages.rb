class Removebooleansfrommessages < ActiveRecord::Migration
  def change
    remove_column :messages, :receiver_view
    remove_column :messages, :sender_view
  end
end
