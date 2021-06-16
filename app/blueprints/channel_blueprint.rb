class ChannelBlueprint < Blueprinter::Base
  identifier :id

  fields :title, :channel_type, :topic, :description
  association :messages, blueprint: MessageBlueprint
end