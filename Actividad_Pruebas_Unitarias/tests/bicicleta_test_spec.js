require('dotenv').config()
const mongoose = require('mongoose')
const assert = require('assert');
const Bicicleta = require('../models/bicicleta')

//checar si hay conexión en MongoDB
describe('Test Bicicletas Model', () => {
    beforeEach(function(done) {
        const mongoDB = process.env.TESTDB_CONNECTION
        mongoose.connect(mongoDB, {useNewUrlParser: true})

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', function(){
            done()
        })
    })

    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err)
            const db = mongoose.connection
            db.close()
            done()
        })
    })

    describe('Bicicleta.createInstance', ()=>{
        it('crear una bicicleta', ()=>{
            let bici = Bicicleta.createInstance(1, 'white', 'aaa', [99.13, -99.13])

            assert.equal(bici.code, 1)
            assert.equal(bici.color, 'white')
            assert.equal(bici.modelo, 'aaa')
            assert.equal(bici.ubicacion[0], 99.13)
            assert.equal(bici.ubicacion[1], -99.13)
        })
    });

    describe('Bicicletas.add', ()=>{
        it('Agregar una bicicleta a MongoDB', (done)=>{
            let bici = new Bicicleta({code: 1, color: 'blamnco', modelo: 'aaa'})
            Bicicleta.add(bici, function(err, newBici){
                if(err) console.log(err)
                Bicicleta.allBicis(function(err, bicis){
                    assert.equal(bicis.length, 1)
                    assert.equal(bicis[0].code, bici.code)
                    done()
                })
            })
        })
    })

    describe('Bicicleta.findByCode', ()=>{
        it('buscar la bicicleta con codigo 1', (done)=>{
            Bicicleta.allBicis(function(err, bicis){
                assert.equal(bicis.length, 0)

                let bici = new Bicicleta({code: 1, color: 'blanco', modelo: 'aaa'})
                Bicicleta.add(bici, function(err, newBike){
                    if(err) console.log(err)

                    let bici2 = new Bicicleta({code: 2, color: 'morado', modelo: 'chiquita'})
                    Bicicleta.add(bici2, function(err, newBike){                        
                        if(err) console.log(err)

                        Bicicleta.findByCode(1, function(err, targetBici){
                            assert.equal(targetBici.code, bici.code)
                            assert.equal(targetBici.color, bici.color)
                            assert.equal(targetBici.modelo, bici.modelo)

                            done()
                        })
                    })
                })
            })
        })
    })

    describe('Remove bike by code', ()=>{
        it('Eliminar bici con codigo 1', (done)=>{
            Bicicleta.allBicis(function(err, bicis){
                assert.equal(bicis.length, 0)
                let bici = new Bicicleta({code: 1, color: 'blanco', modelo: 'aaa'})
                Bicicleta.add(bici, function(err, newBike){
                    if(err) console.log(err)
                    Bicicleta.allBicis(function(err, bicis){
                        assert.equal(bicis.length, 1)
                        Bicicleta.removeByCode(1, function(err, cb){
                            Bicicleta.allBicis(function(err, bicis){
                                assert.equal(bicis.length, 0)
                                done()
                            })
                        })
                    })
                })
            })
        })
    })
})