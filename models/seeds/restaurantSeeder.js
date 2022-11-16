const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantRawData = require('../restaurant.json').results // require Raw Data

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantRawData) // 設定好資料的格式(line 3), 便可直接create
  console.log('raw data is created')
})