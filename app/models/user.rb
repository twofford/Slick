# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  online_status   :boolean
#
class User < ApplicationRecord

    attr_reader :password

    validates :email, :password_digest, :session_token, null: false

    validates :password, length: { minimum: 8, allow_nil: true }

    validates :email, :session_token, uniqueness: true
    
    after_initialize :ensure_session_token

    has_many :channel_memberships

    has_many :channels,
    through: :channel_memberships,
    source: :channel

    # has_many :user_messages

    has_many :messages

    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        @user && @user.is_password?(password) ? @user : nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

end
