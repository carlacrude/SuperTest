'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var Joi        = require('joi'),
    request    = require('supertest'),
    expect     = require('chai').expect,
    joiAssert  = require('joi-assert');

const {
  schemaFilme,
  schemaMessagem,
  schemaListaFilmes
} = require('./schema_filme.js');

const URL_BASE        = "http://www.mocky.io"
const ENDPOINT_FILME_ESPECIFICO  = "/v2/5ade72803300006d0042aceb"
const ENDPOINT_FILME_N_ENCONTRADO = "/v2/5ae1e8d32d000047009d7f5c"
const ENDPOINT_LISTA_FILMES = "/v2/5ae0eaf63200000e00510d79"

const filme = {
  "ano": "2030",
  "duracao": "140 / min",
}

describe("Filme", function(){
       it("É possível recuperar um filme específico", function(done){
         request(URL_BASE)
         .get(ENDPOINT_FILME_ESPECIFICO)
         .expect('Content-Type', "application/json")
         .end(function (err, response) {
           expect(response.status).to.be.eql(200);
           joiAssert(response.body, schemaFilme)
           done(err);
         });
       });

       it("Filme não encontrado para atualizar informações", function(done){
        request(URL_BASE)
        .put(ENDPOINT_FILME_N_ENCONTRADO)
        .send(filme)
        .expect('Content-Type', "application/json")
        .end(function (err, response) {
          expect(response.status).to.be.eql(404);
          expect(response.body.message).to.be.eql("Filme Não encontrado!");
          joiAssert(response.body, schemaMessagem);
          done(err);
        });
      });

      it("Filme não encontrado para atualizar informações", function(done){
        request(URL_BASE)
        .get(ENDPOINT_LISTA_FILMES)
        .expect('Content-Type', "application/json")
        .end(function (err, response) {
          expect(response.status).to.be.eql(200);
          joiAssert(response.body, schemaListaFilmes);
          done(err);
        });
      });

});
