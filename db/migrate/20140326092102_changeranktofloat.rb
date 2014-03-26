class Changeranktofloat < ActiveRecord::Migration
  def change
    change_column :images, :rank, :float
  end
end
