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
    email: 'Solid Snake',
    password: 'password',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

u1 = User.create!(
    email: 'Tom Nook',
    password: 'password',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

u3 = User.create!(
    email: 'Link',
    password: '12345678',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

u4 = User.create!(
    email: 'Waluigi',
    password: '12345678',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

u5 = User.create!(
    email: 'DemoDude',
    password: 'starwars',
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
    title: 'HorsePlay',
    channel_type: 'public',
    created_at: '1/1/2020',
    updated_at: '1/1/2020',
    description: 'Horses and the amusement to be gained thereby'
)

c3 = Channel.create!(
    title: 'Gamin\'',
    channel_type: 'public',
    created_at: '1/1/2020',
    updated_at: '1/1/2020',
    description: 'Bideo games'
)


c4 = Channel.create!(
    title: 'Star Wars',
    channel_type: 'public',
    created_at: '1/1/2020',
    updated_at: '1/1/2020',
    description: 'We talk about Star Wars here.'
)

c5 = Channel.create!(
    title: 'Star Trek',
    channel_type: 'public',
    created_at: '1/1/2020',
    updated_at: '1/1/2020',
    description: 'We talk about Star Trek here.'
)

cm1 = ChannelMembership.create!(
    user_id: User.first.id,
    channel_id: Channel.first.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm2 = ChannelMembership.create!(
    user_id: User.first.id,
    channel_id: Channel.second.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm3 = ChannelMembership.create!(
    user_id: User.first.id,
    channel_id: Channel.third.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm4 = ChannelMembership.create!(
    user_id: User.first.id,
    channel_id: Channel.fourth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm5 = ChannelMembership.create!(
    user_id: User.first.id,
    channel_id: Channel.fifth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm6 = ChannelMembership.create!(
    user_id: User.second.id,
    channel_id: Channel.first.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm7 = ChannelMembership.create!(
    user_id: User.second.id,
    channel_id: Channel.second.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm8 = ChannelMembership.create!(
    user_id: User.second.id,
    channel_id: Channel.third.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm9 = ChannelMembership.create!(
    user_id: User.second.id,
    channel_id: Channel.fourth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm10 = ChannelMembership.create!(
    user_id: User.second.id,
    channel_id: Channel.fifth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm11 = ChannelMembership.create!(
    user_id: User.third.id,
    channel_id: Channel.first.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm12 = ChannelMembership.create!(
    user_id: User.third.id,
    channel_id: Channel.second.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm13 = ChannelMembership.create!(
    user_id: User.third.id,
    channel_id: Channel.third.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm14 = ChannelMembership.create!(
    user_id: User.third.id,
    channel_id: Channel.fourth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm15 = ChannelMembership.create!(
    user_id: User.third.id,
    channel_id: Channel.fifth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm16 = ChannelMembership.create!(
    user_id: User.fourth.id,
    channel_id: Channel.first.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm17 = ChannelMembership.create!(
    user_id: User.fourth.id,
    channel_id: Channel.second.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm18 = ChannelMembership.create!(
    user_id: User.fourth.id,
    channel_id: Channel.third.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm19 = ChannelMembership.create!(
    user_id: User.fourth.id,
    channel_id: Channel.fourth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm20 = ChannelMembership.create!(
    user_id: User.fourth.id,
    channel_id: Channel.fifth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm21 = ChannelMembership.create!(
    user_id: User.fifth.id,
    channel_id: Channel.first.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm22 = ChannelMembership.create!(
    user_id: User.fifth.id,
    channel_id: Channel.second.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm23 = ChannelMembership.create!(
    user_id: User.fifth.id,
    channel_id: Channel.third.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm24 = ChannelMembership.create!(
    user_id: User.fifth.id,
    channel_id: Channel.fourth.id,
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

cm25 = ChannelMembership.create!(
    user_id: User.fifth.id,
    channel_id: Channel.fifth.id,
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

m3 = Message.create!(
    user_id: User.third.id,
    channel_id: Channel.second.id,
    body: 'I like horses.',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)

m4 = Message.create!(
    user_id: User.fourth.id,
    channel_id: Channel.second.id,
    body: 'I also like horses!',
    created_at: '1/1/2020',
    updated_at: '1/1/2020'
)