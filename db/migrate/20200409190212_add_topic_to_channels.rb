class AddTopicToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :topic, :string
  end
end
