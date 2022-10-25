const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const barcodeRouter = require('./barcodeRouter')
const userCodeRouter = require('./userCodeRouter')
const barcodeInfoRouter = require('./barcodeInfoRouter')

router.use('/user', userRouter)
router.use('/barcode', barcodeRouter)
router.use('/userCode', userCodeRouter)
router.use('/barcode_info', barcodeInfoRouter)

module.exports = router


