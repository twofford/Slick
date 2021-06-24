class MessageBlueprint < Blueprinter::Base
  identifier :id

  fields :user_id, :channel_id, :body
  association :user, blueprint: UserBlueprint
end