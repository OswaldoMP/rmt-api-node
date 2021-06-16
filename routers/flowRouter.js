const router = require('express').Router();
const { show, create, usersFlow, showById, update, destroy } = require('../controllers/flowController');

router.get('/', show);
router.get('/:id', showById);
router.post('/create', create);
router.get('/user/:id', usersFlow);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

module.exports = router;