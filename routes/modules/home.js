const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//setting routes index
router.get('/', (req, res) => {
  const sortValue = req.query.sort  // sortValue => String: A-Z or Z-A ...
  const sort = sortValue ? { [sortValue]: true } : { "a-z": true } // sort => Object: {a: true }
  const sortOption = {
    'A-Z': { name: 'asc' },
    'Z-A': { name: 'desc' },
    'category': { category: 'asc' },
    'location': { location: 'asc' },
    'rating':{ rating: 'desc' }
  }
  Restaurant.find()
    .lean()
    .sort(sortOption[sortValue])
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(error => console.log(error))
})

//setting routes search
router.get('/search', (req, res) => {
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


// 匯出路由器
module.exports = router