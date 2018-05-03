'use strict';

const Joi = require ('joi');

const schemaCard = Joi.object({
    "_id": Joi.string(),
    "chapter": Joi.object().keys({
       "_id": Joi.string(),
       "name": Joi.string(),
       "initials": Joi.string()
    }).required(),
    "category": Joi.object().keys({
        "_id": Joi.string(),
        "name": Joi.string(),
     }).required(),
     "subject": Joi.string().required(),
     "description": Joi.string().required(),
     "created_at": Joi.string().required(),
})

 const schemaCadastro = Joi.object({
    "data": Joi.object({
        "cards": Joi.array().items(schemaCard).required(),
        "count": Joi.number().integer().required(),
    }).required(), 
      "error": Joi.allow(null).required()
 })


 module.exports = {
    schemaCadastro,
    schemaCard
 }

