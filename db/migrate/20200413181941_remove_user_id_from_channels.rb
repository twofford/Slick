class RemoveUserIdFromChannels < ActiveRecord::Migration[5.2]
  def change
    remove_column :channels, :user_id
  end
end
