const mongoose = require('mongoose');
const { Schema } = require('mongoose');

var ubicacionSchema = new Schema({
    descripcion:{
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    canal:{
        type: String,
        required: true,
        trim: true
    },
    actuador:{
        type: String,
        required: true,
        trim: true
    },
    modo:{
        type: String,
        default: 'apagado',
        trim: true
    }
    
});
var Ubicacion = mongoose.model('Ubicacion', ubicacionSchema);
module.exports  = { Ubicacion };