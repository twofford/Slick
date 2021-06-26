require "faker"

FactoryBot.define do
  factory :channel do
    title { Faker::Fantasy::Tolkien.character }
    channel_type { "public" }
    description { "Description" }
  end

  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 20, special_characters: true) }
    password_digest { BCrypt::Password.create(password) }
    session_token { SecureRandom::urlsafe_base64 }
  end

  factory :message do
    association :user, factory: :user
    association :channel, factory: :channel
    body { "This is a message" }
  end

  factory :channel_membership do
    association :user, factory: :user
    association :channel, factory: :channel
  end
end