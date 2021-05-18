require "faker"

FactoryBot.define do
  factory :channel do
    title { Faker::GreekPhilosophers.name }
    channel_type { "public" }
    description { Faker::GreekPhilosophers.name }
    channel_or_dm { "channel" }
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
end