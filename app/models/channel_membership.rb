class ChannelMembership < ApplicationRecord

    validates :user_id, :channel_id, null: false

    belongs_to :user

    belongs_to :channel

end