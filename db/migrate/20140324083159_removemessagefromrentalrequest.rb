class Removemessagefromrentalrequest < ActiveRecord::Migration
  def change
    remove_column :rental_requests, :message
  end
end
