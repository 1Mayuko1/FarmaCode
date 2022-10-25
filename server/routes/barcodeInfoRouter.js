const Router = require('express')
const router = new Router()
const barcodeInfoController = require('../controllers/barcodeInfoController')

router.get('/', barcodeInfoController.getAll)
router.get('/:id', barcodeInfoController.getOne)
router.delete('/:id', barcodeInfoController.deleteOne)

module.exports = router
