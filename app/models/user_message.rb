class UserMessage < ApplicationRecord

    validates :user_id, :message_id, null: false

    belongs_to :user

    belongs_to :message
    
end