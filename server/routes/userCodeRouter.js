const Router = require('express')
const router = new Router()
const userCodeController = require('../controllers/userCodeController')

router.post('/user/:userId/', userCodeController.create)
router.get('/:userId/', userCodeController.getAllUserCodes)
router.get('/', userCodeController.getAllCodes)
router.delete('/:userId/', userCodeController.deleteById)

// Не працює разом з deleteAllUserProducts, Роут виключно для тестування
// router.delete('/:id', usersProductsRouter.deleteUserProductsById)

module.exports = router
