const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(3).max(25).required(),
    password: Joi.string().min(3).max(25).required()
})

const folderSchema = Joi.object({
    name: Joi.string().min(3).max(25).required()
})

module.exports = {
    userSchema,
    folderSchema
}