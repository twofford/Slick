# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ChannelMembership.delete_all
User.delete_all
Channel.delete_all
Message.delete_all
UserMessage.delete_all

u1 = User.create!(
    email: 'bigbossfan@shadowmoses.gov',
    password: 'password',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

u1 = User.create!(
    email: 'tnook@islandmail.com',
    password: 'password',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

u3 = User.create!(
    email: 'i<3princesszelda@hyruleisp.com',
    password: '12345678',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

u4 = User.create!(
    email: 'wario_rulez@mushroomkingdom.org',
    password: '12345678',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

c1 = Channel.create!(
    title: 'General',
    channel_type: 'public',
    created_at: '1/1/2020',
    updated_at: '1/1/2020',
    description: 'Just chattin\' about whatever'
)

c2 = Channel.create!(
    title: 'Private Chat',
    channel_type: 'private',
    created_at: '1/1/2020',
    updated_at: '1/1/2020',
    description: 'Super secret private convo'
)

c3 = Channel.create!(
    title: 'HorsePlay',
    channel_type: 'public',
    created_at: '1/1/2020',
    updated_at: '1/1/2020',
    description: 'Horses and the amusement to gained thereby'
)

c4 = Channel.create!(
    title: 'A Group DM With A Very Long Name To Test Text Overflow',
    channel_type: 'private',
    created_at: '1/1/2020',
    updated_at: '1/1/2020',
    description: 'Nothing to see here'
)

cm1 = ChannelMembership.create!(
    user_id: User.first.id,
    channel_id: Channel.first.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm2 = ChannelMembership.create!(
    user_id: User.second.id,
    channel_id: Channel.first.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm3 = ChannelMembership.create!(
    user_id: User.first.id,
    channel_id: Channel.second.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm4 = ChannelMembership.create!(
    user_id: User.second.id,
    channel_id: Channel.second.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

m1 = Message.create!(
    user_id: User.first.id,
    channel_id: Channel.first.id,
    body: 'What\'s going on in here?',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

m2 = Message.create!(
    user_id: User.second.id,
    channel_id: Channel.first.id,
    body: 'Not much.',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

um1 = UserMessage.create!(
    user_id: User.first.id,
    message_id: Message.first.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

um2 = UserMessage.create!(
    user_id: User.second.id,
    message_id: Message.second.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)