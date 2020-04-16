class CreateUserMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :user_messages do |t|
      t.integer :user_id, null: false
      t.integer :message_id, null:false
      t.timestamps
    end
  end
end
