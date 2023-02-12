const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if(!email || !password || !confirmPassword) {
    errors.push({ message : '請填寫必填欄位。'})
  }
  if(password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！'})
  }
  if(errors.length) {
    return res.render('register', {
      errors,
      ...req.body
    })
  }
  User.findOne({ email })
    .then( user => {
      if (user) {
        errors.push({ message: '此Eamil已註冊。'})
        return res.render('register', { errors, ...req.body })
      } 
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err)) )      
    })
    .catch(err => console.log(err))
})

module.exports = router