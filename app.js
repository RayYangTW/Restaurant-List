//require package
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

require('./config/mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')
const Restaurant = require('./models/restaurant')
const routes = require('./routes')

const app = express()
const port = 3000


//用 app.use 規定每一筆請求都會透過 midle ware 進行前置處理
app.use(session({
  secret: 'thisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))//setting static files
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(routes)

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'handlebars')

//start and listen on Express server
app.listen(port, () => {
  console.log(`Restaurant List is listening on http://localhost:${port}`)
})