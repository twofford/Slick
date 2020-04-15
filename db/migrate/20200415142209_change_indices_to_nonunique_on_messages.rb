class ChangeIndicesToNonuniqueOnMessages < ActiveRecord::Migration[5.2]
  def change
    remove_index :messages, :channel_id
    remove_index :messages, :user_id
  end
end
