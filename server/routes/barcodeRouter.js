const Router = require('express')
const router = new Router()
const barcodeController = require('../controllers/barcodeController')

router.post('/', barcodeController.create)
router.get('/', barcodeController.getAll)
router.get('/:id', barcodeController.getOne)
router.delete('/:id', barcodeController.deleteOne)

module.exports = router
