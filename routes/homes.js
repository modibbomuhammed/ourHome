var express = require('express');
var router = express.Router();
var Home = require('../models/home');
var multer  = require('multer');
const { getHomes, newHome, createHome, showHome, editHome, updateHome, deleteHome } = require('../controllers/home')
const { cloudinary, storage } = require('../cloudinary')

const upload = multer({ storage }).array('pictures', 10)


router.get('/', getHomes)

router.get('/new', newHome)

router.post('/', upload, createHome)

router.get('/:id', showHome)

router.get('/:id/edit', editHome)

router.put('/:id', upload, updateHome)

router.delete('/:id', deleteHome)

module.exports = router;
