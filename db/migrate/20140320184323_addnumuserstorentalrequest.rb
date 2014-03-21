class Addnumuserstorentalrequest < ActiveRecord::Migration
  def change
    add_column :rental_requests, :guests, :integer
  end
end
