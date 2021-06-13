# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  title        :string           not null
#  channel_type :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  topic        :string
#  description  :string
#
class Channel < ApplicationRecord

    validates :user_id, :title, :channel_type, null: false

    validates :title, length: { minimum: 1 }

    validates :title, uniqueness: true

    validates :channel_type, inclusion: {in: ['public', 'private', 'dm']}

    has_many :channel_memberships

    has_many :users,
    through: :channel_memberships,
    source: :user

    has_many :messages

end
