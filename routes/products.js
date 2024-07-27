const express = require('express')
const router = express.Router()
const {getAllProductsStatics,getAllProducts} = require('../controllers/products')



router.get('/', getAllProducts)
router.get('/statics', getAllProductsStatics)



module.exports = router






