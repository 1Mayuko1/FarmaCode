const sequelize = require('../db')
const { STRING, INTEGER, JSON, TEXT} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: STRING, unique: true,},
    password: {type: STRING},
    role: {type: STRING, defaultValue: "USER"}
})

const UserCode = sequelize.define('user_code', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: INTEGER},
    barcodeValues: {type: JSON}
})

const Barcode = sequelize.define('barcode', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    startNumber: {type: INTEGER, allowNull: false},
    keyNumber: {type: INTEGER, allowNull: false},
    outputSequence: {type: STRING, allowNull: false},
    SHKCode32: {type: STRING, allowNull: false},
    codedNumber: {type: STRING, allowNull: false},
})

const BarcodeInfo = sequelize.define('barcode_info', {
    id: {type: INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: STRING, allowNull: false, defaultValue: ''},
    description: {type: TEXT, allowNull: false, defaultValue: ''},
})

Barcode.hasMany(BarcodeInfo, {as: 'info'})
BarcodeInfo.belongsTo(Barcode)

module.exports = {
    User,
    UserCode,
    Barcode,
    BarcodeInfo
}
