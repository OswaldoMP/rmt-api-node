const router = require('express').Router();

const { register, login } = require('../controllers/userController');

router.post('/', login)
router.post('/user', register);

module.exports = router;