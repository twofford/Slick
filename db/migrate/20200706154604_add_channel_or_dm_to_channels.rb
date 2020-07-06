class AddChannelOrDmToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :channel_or_dm, :string
  end
end
