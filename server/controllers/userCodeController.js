const {UserCode, User} = require('../models/models')
const ApiError = require('../error/ApiError')

class UsersCodesController {
    async create(req, res, next) {
        const id = +req.params.userId
        const {barcodeValues} = req.body

        const candidate = await User.findOne({where: {id}})
        if (!candidate) {
            return next(ApiError.badRequest('Користувача з таким id не існує'))
        }

        const barcodeData = await UserCode.create({userId: id, barcodeValues})
        return res.json(barcodeData)
    }

    async getAllCodes(req, res) {
        const barcodes = await UserCode.findAll()
        return res.json(barcodes)
    }

    async getAllUserCodes(req, res, next) {

        const {userId} = req.params

        const candidate = await User.findOne({where: {id: userId}})
        if (!candidate) {
            return next(ApiError.badRequest('Користувача не знайдено'))
        }

        const allUserBarcodes = await UserCode.findAll({where: {userId}})
        if (!allUserBarcodes) {
            return next(ApiError.badRequest('Продуктів користувача не знайдено'))
        } else if (allUserBarcodes.length <= 0) {
            return next(ApiError.badRequest('Користувач ще не вносив свої продукти'))
        }

        const barcodes = await UserCode.findAll({where: {userId}})
        return res.json(barcodes)
    }

    async deleteById (req, res, next) {
        try {
            const {id} = req.params
            if (Number.isNaN(id)) {
                return next(ApiError.badRequest('Неправильного формату id'))
            }
            const userBarcodes = await UserCode.findOne({where: {id: id}})
            if (!userBarcodes) {
                return res.json({message: 'Продуктів з таким ID не знайдено'})
            }
            await UserCode.destroy({ where: {id}})
            return res.json(userBarcodes)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UsersCodesController()
