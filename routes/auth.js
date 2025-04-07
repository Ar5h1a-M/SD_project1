const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();


router.post('/sign_up',authController.sign_up);
router.post('/login',authController.login);



module.exports = router;