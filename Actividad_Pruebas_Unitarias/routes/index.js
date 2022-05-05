var express = require('express');
var router = express.Router();
const { getReservas } = require('../controllers/usuarios');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (!req.user) {
    return res.render('index');
  }
  next()
},
  getReservas,
  (req, res, next) => {
    res.render('home', { user: req.user })
  }
);

module.exports = router;
