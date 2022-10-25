const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/:id', userController.getOne)
router.get('/', userController.getAll)

// http://localhost:5000/api/user/:id
router.delete('/:id', userController.deleteOne)

module.exports = router
