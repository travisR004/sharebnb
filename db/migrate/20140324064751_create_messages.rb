class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.text :content
      t.boolean :sender_view, default: true
      t.boolean :receiver_view, default: true
      t.timestamps
    end
  end
end
