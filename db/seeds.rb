# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

u1 = User.create!(
    email: 'bigbossfan@shadowmoses.gov',
    password_digest: '123456',
    session_token: '123456',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

u1 = User.create!(
    email: 'tnook@islandmail.com',
    password_digest: '123456',
    session_token: 'abcdef',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)