const {Barcode, BarcodeInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class BarcodeController {
    async create(req, res, next) {
        try {
            let {startNumber, keyNumber, outputSequence, SHKCode32, codedNumber, info} = req.body

            const barcode = await Barcode.create({
                startNumber,
                keyNumber, outputSequence,
                SHKCode32,
                codedNumber
            })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => BarcodeInfo.create({
                    title: i.title,
                    description: i.description,
                    id: barcode.id
                }))
            }

            return res.json(barcode)
        } catch (e) {
            next(e.message)
            console.log('Error: ', e)
        }

    }

    async getAll(req, res) {
        let {limit, page} = req.query

        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit

        let barcodes = await Barcode.findAndCountAll({offset})
        return res.json(barcodes)
    }

    async getOne(req, res) {
        const {id} = req.params
        const barcode = await Barcode.findOne(
            {
                where: {id},
                include: [{model: BarcodeInfo, as: 'info'}]
            },
        )
        if (!barcode) {
            return res.json({message: 'Id не знаайдено'})
        }
        return res.json(barcode)
    }

    async deleteOne (req, res, next) {
        try {
            const {id} = req.params
            if (Number.isNaN(id)) {
                return next(ApiError.badRequest('Неправильного формату id'))
            }

            const barcode = await Barcode.findOne({where: {id}})
            if (!barcode) {
                return res.json({message: 'Рецепту з таким ID не знайдено'})
            }

            await Barcode.destroy({ where: {id}})
            return res.json(barcode)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BarcodeController()
