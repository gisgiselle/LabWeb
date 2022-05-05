require('dotenv').config()
const mongoose = require('mongoose')
const assert = require('assert');
const Usuario = require('../models/usuario')
const Bicicleta = require('../models/bicicleta');
const reserva = require('../models/reserva');

let testUser;
let testBike;

describe('Test Usuario Model', () => {
    beforeEach(function (done)  {
        const mongoDB = process.env.TESTDB_CONNECTION
        mongoose.connect(mongoDB, {useNewUrlParser: true})

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', async function(){  

            await Bicicleta.deleteMany({});
            await Usuario.deleteMany({});
            //let example = Bicicleta.createInstance()
            testBike = await Bicicleta.create({code:99, color:'blue', model:'vintage', lat:19.25, lon:-99.15});
            testUser = await Usuario.create({nombre: "Test", email:"test@test.com", password: "somePassword", verificado: true})

            done();
        })
    })

    afterEach(async function(){
        await Bicicleta.deleteMany({})
        await Usuario.deleteMany({})
        const db = mongoose.connection
        db.close()
    })


    
    describe('Usuario reserva', function () {
        it('usuario crea reserva', async () => {
            await testUser.reservar(testBike._id, '2009-06-14', '2009-06-24');  
            await reserva.deleteMany({})          
        })
    })
})