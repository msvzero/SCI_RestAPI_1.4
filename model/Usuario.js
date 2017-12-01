const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');


var usuarioSchema = new Schema({
    nombreCompleto: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    hash_password:{
        type: String,
        required: true
    },
    creado_el:{
        type: Date,
        default: Date.now
    }
});

usuarioSchema.methods.comparaPassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
}

var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = { Usuario };