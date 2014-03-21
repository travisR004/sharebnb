class Addmessagetorentalrequest < ActiveRecord::Migration
  def change
    add_column :rental_requests, :message, :text
  end
end
