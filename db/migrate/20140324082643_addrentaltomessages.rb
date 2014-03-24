class Addrentaltomessages < ActiveRecord::Migration
  def change
    add_column :messages, :rental_request_id, :integer
  end
end
