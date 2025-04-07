const express = require('express');
const router = express.Router();


router.get('/', (request, response) => {
    response.render('index');
})

router.get('/login', (request, response) => {
    response.render('login');
})

router.get('/sign_up', (request, response) => {
    response.render('sign_up');
})

router.get('/home', (request, response) => {
    response.render('home');
})

router.get('/profile', (request, response) => {
    response.render('profile');
})

router.get('/logOut', (request, response) => {
    response.render('logOut');
})

module.exports = router;