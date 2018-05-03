'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var Joi        = require('joi'),
    request    = require('supertest'),
    expect     = require('chai').expect,
    joiAssert  = require('joi-assert');

const {
    schemaCadastro, 
} = require('./schema_cadastro.js');

const URL_BASE = "http://localhost:3000"
const ENDPOINT_CADASTRO = "/api/cards"
const ENDPOINT_LISTAGEM = "/api/cards?page=1&limit=10"

const getTime = () => {
    var time = new Date();
    return time;
}

const cadastro = {
    'chapter': "5ad0f1a71d9c2220e3c9f954",
    'category': "5ad0f1be1d9c2220e3c9f955",
    'subject': getTime(),
    'description': 'carlaaparecidocarlaapareciocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecidocarlaaparecido'
}

describe("Card", function(){
    it("Cadastro de card efetuado com sucesso", function(done){
        request(URL_BASE)
        .post(ENDPOINT_CADASTRO)
        .send(cadastro)
        .end(function(err, response){
            expect(response.status).to.be.eql(201);
            done(err);
        });
    });

    it("Listagem de cadastro com sucesso", function(done){
        request(URL_BASE)
        .get(ENDPOINT_LISTAGEM)
        .expect('Content-Type', "application/json; charset=utf-8")
        .end(function(err, response){
            if (err) throw err;
            expect(response.status).to.be.eql(200);
            joiAssert(response.body, schemaCadastro);
            done(err);
        });
    });    
});
