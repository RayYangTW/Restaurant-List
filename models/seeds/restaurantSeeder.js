const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const restaurantRawData = require('../restaurant.json').results // require Raw Data

db.once('open', () => {
  Restaurant.create(restaurantRawData) // 設定好資料的格式(line 3), 便可直接create
  console.log('raw data is created')
})