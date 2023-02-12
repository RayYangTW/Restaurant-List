const express = require('express')
const passport = require('passport')

const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/users/login'
}))

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err) }
    // req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  })
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then( user => {
      if (user) {
        console.log('email already registered.')
        return res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password, confirmPassword })
          .then(() => res.redirect('/'))
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

module.exports = router