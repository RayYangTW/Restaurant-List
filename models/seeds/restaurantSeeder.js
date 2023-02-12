const mongoose = require('mongoose')
const bcrypt =require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantRawData = require('../restaurant.json').results // require Raw Data

const SEED_USERS = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  restaurant: [0, 1, 2]
}, 
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  restaurant: [3, 4, 5]
}]

db.once('open', () => {
  return Promise.all(SEED_USERS.map( user => {
    const { restaurant } = user
    return bcrypt
      .genSalt(10)
      .then( salt => bcrypt.hash(user.password, salt))
      .then( hash => User.create({ 
        name: user.name, 
        email: user.email, 
        password: hash}))
      .then( userData => {
        const userId = userData._id
        const restaurants = restaurant.map( index => {
         const restaurant = restaurantRawData[index]
          restaurant.userId = userId
          return restaurant
        })
        return Restaurant.create(restaurants)
      })
  })) 
  .then(() => {
       console.log('seed users and restaurant data are created.')
       process.exit() 
  })
})