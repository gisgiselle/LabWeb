require('dotenv').config()
const mongoose = require('mongoose')
const assert = require('assert');
const Bicicleta = require('../models/bicicleta')

const request = require('request');
const BASE_URL = 'http://localhost:3000/api/bicicletas/'

describe('Bicicletas API', function () {

    beforeEach(function (done) {
        this.timeout(10000);
        var mongoDB = process.env.TESTDB_CONNECTION
        mongoose.connect(mongoDB, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.error(err);
            }
            done()
        })
    })

    afterEach(function (done) {
        Bicicleta.deleteMany({}, function (err, success) {
            if (err) console.log(err)
            const db = mongoose.connection
            db.close()
            done()
        })
    })

    describe('API GET /bicicletas', function () {
        it('regresar lista de todas las bicis', function (done) {
            request.get(BASE_URL, function (error, response, body) {
                let res = JSON.parse(body)
                assert.equal(response.statusCode, 200);
                let bicis_num = res.bicicletas.length;
                assert.equal(res.bicicletas.length, 0);
                done()
            })
        });
    })

    describe('API POST bicicletas/create', () => {
        it('agregar bicicleta', (done) => {
            const headers = { 'content-type': 'application/json' }
            const payload = JSON.stringify({
                code: 123,
                modelo: 'chiquito',
                color: 'amarillo',
                lat: -19.28,
                lon: 19.28
            })
            request.post({
                headers: headers,
                url: BASE_URL+'create',
                body: payload
            }, (error, response, body) => {
                assert.equal(response.statusCode, 200);
                let newBike = JSON.parse(body).bicicleta
                assert.equal(newBike.color, 'amarillo')
                assert.equal(newBike.ubicacion[0], -19.28)
                assert.equal(newBike.ubicacion[1], 19.28)
                done()
            })
        })
    })
});