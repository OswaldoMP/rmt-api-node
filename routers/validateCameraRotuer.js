const router = require('express').Router();
const { show, create, showById, update, destroy } = require('../controllers/validateCameraController');

router.get('/', show);
router.get('/:id', showById);
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

module.exports = router;