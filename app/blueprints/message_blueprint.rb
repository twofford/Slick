class MessageBlueprint < Blueprinter::Base
  
  identifier :id

  fields :user_id, :channel_id, :body
  
end