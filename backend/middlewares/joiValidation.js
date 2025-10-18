const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(3).max(25).required(),
    password: Joi.string().min(3).max(25).required()
})

const folderSchema = Joi.object({
    name: Joi.string().min(3).max(25).required()
})

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
})

const noteSchema = Joi.object({
    title: Joi.string().min(3).max(20).required(),
    content: Joi.string().min(3).max(50).required()
}) 

module.exports = {
    userSchema,
    folderSchema,
    idSchema,
    noteSchema
}