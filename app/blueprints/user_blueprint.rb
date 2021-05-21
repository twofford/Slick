class UserBlueprint < Blueprinter::Base
  identifier :id

  fields :email, :online_status
end