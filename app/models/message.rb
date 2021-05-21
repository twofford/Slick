# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  channel_id :integer          not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord

    validates :user_id, :channel_id, :body, null: false

    belongs_to :user

    belongs_to :channel

end
