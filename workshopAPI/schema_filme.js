'use strict';

const Joi = require('joi');

const schemaMessagem = Joi.object({
    "message": Joi.string().required(),
}).required();

const schemaAvaliacao = Joi.object({
    "fonte": Joi.string().required(),
	"valor": Joi.string().required(),
}).required();

const schemaFilme = Joi.object({
    "Titulo": Joi.string().required(),
	"Ano": Joi.string().required(),
	"data_lancamento": Joi.string().required(),
	"duracao": Joi.string().required(),
	"genero": Joi.string().required(),
	"diretor": Joi.string().required(),
	"escritores": Joi.string().required(),
	"atores": Joi.string().required(),
	"avaliacoes": Joi.array().items(schemaAvaliacao),
}).required();

const schemaListaFilmes = Joi.object({
    "page": Joi.number().integer().positive().required().options({
        convert: false
    }),
    "data": Joi.string().required(),
    "filmes": Joi.array().items(schemaFilme),
}).required();

module.exports = {
    schemaFilme,
    schemaMessagem,
    schemaListaFilmes
}