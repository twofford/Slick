class Channel < ApplicationRecord

    validates :user_id, :title, :channel_type, null: false

    validates :title, uniqueness: true

    validates :channel_type, inclusion: {in: ['public', 'private']}

    has_many :channel_memberships

    has_many :users,
    through: :channel_memberships,
    source: :user

    has_many :messages


end