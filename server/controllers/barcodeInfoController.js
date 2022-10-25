const {BarcodeInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class BarcodeInfoController {
    async getAll(req, res) {
        const infos = await BarcodeInfo.findAll()
        return res.json(infos)
    }

    async getOne(req, res) {
        const {id} = req.params
        const barcodeInfo = await BarcodeInfo.findAll(
            {
                where: {id},
            }
        )
        if (!barcodeInfo) {
            return res.json({message: 'BarcodeInfo з таким Id не знайдено'})
        }
        return res.json(barcodeInfo)
    }

    async deleteOne (req, res, next) {
        try {
            const {id} = req.params
            if (Number.isNaN(id)) {
                return next(ApiError.badRequest('Неправильного формату id'))
            }
            const barcodeInfo = await BarcodeInfo.findOne({where: {id}})
            if (!barcodeInfo) {
                return res.json({message: 'RecipeInfo з таким Id не знайдено'})
            }
            await BarcodeInfo.destroy({ where: {id}})
            return res.json(barcodeInfo)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BarcodeInfoController()
