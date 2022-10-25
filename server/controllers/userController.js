const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, password, role) => {
    return jwt.sign(
        {id, email, password, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            const candidate = await User.findOne({where: {email}})

            if (!email || !password) {
                return next(ApiError.badRequest('Некоректний email чи пароль'))
            } else if (candidate) {
                return next(ApiError.badRequest('Користувач з таким email уже існує'))
            } else {
                const hashPassword = await bcrypt.hash(password, 5)

                const user = await User.create({
                    email,
                    password: hashPassword,
                    role,
                })

                const token = await generateJwt(user.id, user.email, user.password, user.role)
                return res.json({token})
            }

        } catch (e) {
            console.log('Помилка з registration: ', e)
            next(e.message)
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Корисстувача не знайдено'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Вказаний неправильний пароль'))
        }

        const token = await generateJwt(user.id, user.email, user.password, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.password, req.user.role)
        return res.json({token})
    }

    async deleteOne(req, res, next) {
        try {
            const {id} = req.params
            if (Number.isNaN(id)) {
                return next(ApiError.badRequest('Неправильного формату id'))
            }
            const user = await User.findOne({where: {id}})
            if (!user) {
                return res.json({message: 'Користувача з таким ID немає в базі'})
            }
            await User.destroy({ where: {id}})
            return res.json(user)
        }catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        if (!user) {
            return res.json({message: 'Користувача з таким ID немає в базі'})
        }
        return res.json(user)
    }

    async getAll(req, res) {
        const user = await User.findAll()
        return res.json(user)
    }
}

module.exports = new UserController()
