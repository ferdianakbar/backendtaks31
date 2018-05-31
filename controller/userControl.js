helpers = require('../config/helper.js');
userModel = require('../models/userModel.js');

var users = {};

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
            var user = userModel();
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
        var errs = req.validationErrors();

        var errs = req.validationErrors();
        if (errs) {
            helpers.failure(res, next, errs, 400);
        } else {

            var nwusr = req.params;
            userModel.findOne({username: nwusr.username, password: nwusr.password}, function(err, users){
                if (err){
                    helpers.failure(res, next, err, 404);
                }else if ( users == null){
                    helpers.failure(res, nex, 'username atau password salah', 404);
                } else {
                    helpers.success(res, next, users);
                }
            });
        }
    })
};