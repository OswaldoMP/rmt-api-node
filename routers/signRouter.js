const router = require('express').Router();
const { show, create, showById, update, destroy } = require('../controllers/singController');

const multer = require('multer');

const upload = multer({
    dest: 'public/files/signs'
});

router.get('/', show);
router.get('/:id', showById);
router.post('/create', [upload.single('file')], create);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);

module.exports = router;