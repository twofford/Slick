class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :channel_type, null: false
      t.timestamps
    end
    add_index :channels, :user_id
    add_index :channels, :title, unique: true
  end
end
