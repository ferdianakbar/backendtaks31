helpers = require('../config/helper.js');
userModel = require('../models/userModel.js');

module.exports = function(server){
    server.post('/register', function(req, res, next){
        req.assert('username', 'username diperlukan').notEmpty();
        req.assert('password', 'password diperlukan').notEmpty();
        req.assert('nama', 'nama diperlukan').notEmpty();
        req.assert('email', 'email diperlukan').notEmpty().isEmail();
        req.assert('telepon', 'telephon harus diperlukan dan harus angka').notEmpty().isNumeric();

        var errs = req.validationErrors();
        if (errs) {
            helpers.failure(res, next, errs, 400);
        } else {
            var user = new userModel();
            var nwuser = req.params;
            user.username = nwuser.username;
            user.password = nwuser.password;
            user.nama = nwuser.nama;
            user.email = nwuser.email;
            user.telepon = nwuser.telepon;

            user.save(function (err){
                if (err) {
                    helpers.failure(res, next, 'error while saving user', 500);
                } else {
                    helpers.success(res, next, user);
                }
            })
        }
    })

    server.post('/login', function (req, res, next){
        req.assert('username', 'username diperlukan').notEmpty();
        req.assert('password', 'password diperlukan').notEmpty();
        userModel.find({}, function(err){
            if (err) {
                helpers.failure(res, nex, 'username atau password salah', 302)
            } else {
                helpers.success(res, next, status);
            }
        }).findOne().sort({ field: 'asc', username: req.params.username, password: req.params.password}).limit(1);
    })
};