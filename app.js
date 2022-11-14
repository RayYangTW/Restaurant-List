//require package
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose') // require mongoose
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//setting static files
app.use(express.static('public'))
//用 app.use 規定每一筆請求都會透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// require json files
const restaurantList = require('./restaurant.json').results

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting routes index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//setting routes new
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//setting routes post
app.post('/restaurants', (req, res) => {
  Restaurant.create( req.body )   // req.body 不需要加 {}
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//setting routes show
//動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


//setting routes search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const lowerKeyword = keyword.toLocaleLowerCase()
  Restaurant.find()
    .lean()
    .then((restaurant) => {
      const filteredRestaurants = restaurant.filter(
        restaurant =>
          restaurant.name.toLocaleLowerCase().includes(lowerKeyword) ||
          restaurant.category.toLocaleLowerCase().includes(lowerKeyword)
      )
      if(!filteredRestaurants.length) {
        res.render('no-result', { keyword })
      } else {
        res.render('index', { restaurants: filteredRestaurants, keyword })
      }
    })
    .catch(error => console.log(error))
})

//start and listen on Express server
app.listen(port, () => {
  console.log(`Restaurant List is listening on localhost:${port}`)
})