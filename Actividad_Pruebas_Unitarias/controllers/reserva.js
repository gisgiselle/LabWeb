const Reserva = require('../models/reserva')

exports.create_get = function (req, res) {
    if (!req.user) {
        res.redirect('/usuarios/login');
        return;
    }

    res.render('reservas/create', {usuario: req.user})
}

exports.delete = async function(req, res, next) {
    const {id} = req.params;
    try {
        await Reserva.findByIdAndDelete(id)
        return res.redirect('/');
    } catch (e) {
        console.error(e);
        return res.status(500).redirect('/');
    }
}