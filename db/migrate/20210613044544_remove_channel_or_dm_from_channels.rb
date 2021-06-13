class RemoveChannelOrDmFromChannels < ActiveRecord::Migration[5.2]
  def change
    remove_column :channels, :channel_or_dm
  end
end
