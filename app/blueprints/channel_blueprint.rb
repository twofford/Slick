class ChannelBlueprint < Blueprinter::Base
  identifier :id

  fields :title, :channel_type, :topic, :description, :channel_or_dm
end