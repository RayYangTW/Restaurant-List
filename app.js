//require package
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

// require json files
const restaurantList = require('./restaurant.json')

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

//setting routes index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//setting routes show
//動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant})
})

//setting routes search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(
    restaurant => 
      restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
      restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
  )
  res.render('index', { restaurants, keyword })
})

//start and listen on Express server
app.listen(port, () => {
  console.log(`Restaurant List is listening on localhost:${port}`)
})