const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//setting routes new
router.get('/new', (req, res) => {
  return res.render('new')
})

//setting routes post
router.post('/', (req, res) => {
  const userId = req.user._id
  Restaurant.create({ userId, ...req.body })   // spread operator
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//setting routes show
//動態路由
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//setting routes get edit
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//setting routes post edit
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOneAndUpdate({ _id, userId }, { ...req.body, userId })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//setting routes post delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router