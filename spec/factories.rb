require "faker"

FactoryBot.define do
  factory :channel do
    title { "Channel" }
    channel_type { "public" }
    description { "Description" }
  end

  factory :user do
    email { Faker::Internet.email }
    password_digest { Faker::Internet.password(min_length: 20, special_characters: true) }
    session_token { Faker::Internet.password(min_length: 20, special_characters: true) }
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