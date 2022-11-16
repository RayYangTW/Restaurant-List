const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//setting routes new
router.get('/new', (req, res) => {
  return res.render('new')
})

//setting routes post
router.post('/', (req, res) => {
  Restaurant.create( req.body )   // req.body 不需要加 {}
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//setting routes show
//動態路由
router.get('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//setting routes get edit
router.get('/:restaurant_id/edit', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//setting routes post edit
router.put('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findByIdAndUpdate(restaurant_id, req.body)
    .then(restaurant => res.redirect(`/restaurants/${restaurant_id}`))
    .catch(error => console.log(error))
})

//setting routes post delete
router.delete('/:restaurant_id', (req, res) => {
  const restaurant_id = req.params.restaurant_id
  Restaurant.findById(restaurant_id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router