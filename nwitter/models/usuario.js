module.exports = function(){
    var db = require('mongoose');
    var Schema = db.Schema;

    var usuario = Schema({
        nome: {type: String, required: true},
        nickname: {type: String, required: true, index:{unique:true}},
        email: {type: String, required: true, index:{unique:true}},
        senha: {type: String, required: true}
    });

    return db.model('usuarios', usuario);
}