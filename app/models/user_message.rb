# == Schema Information
#
# Table name: user_messages
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  message_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserMessage < ApplicationRecord

    validates :user_id, :message_id, null: false

    belongs_to :user

    belongs_to :message
    
end
