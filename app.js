//require package
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
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
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//start and listen on Express server
app.listen(port, () => {
  console.log(`Restaurant List is listening on http://localhost:${port}`)
})