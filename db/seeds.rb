# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

100.times do
    msg = Faker::Lorem.sentence;
    neg = Random.rand(2);
    lat = Random.rand(91);
    lat *= -1 if neg == 1
    neg = Random.rand(2);
    lng = Random.rand(181);
    lng *= -1 if neg == 1
    Note.create(message: msg, latitude: lat, longitude: lng)
end