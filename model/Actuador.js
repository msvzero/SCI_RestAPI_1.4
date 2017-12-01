const mongoose = require('mongoose');
const { Schema } = require('mongoose');

var actuadorSchema = new Schema({
    ubicacion: {
        type: String,
        required: true,
        minlength: 4,
        trim: true
    },
    modos_canales: {
        canal_1: String,
        canal_2: String,
        canal_3: String,
        canal_4: String,
        canal_5: String,
        canal_6: String
    },
    modelo: {
        type: String,
        required: true,
        minlength: 4,
        trim: true

    },
    iluminacionExterna: {
        type: Number,
        default: 0,
        trim: true

    },
    canales:{
        type: Number,
        default: 6,
        trim: true
    },
    
});

var Actuador = mongoose.model('Actuador', actuadorSchema);
module.exports = { Actuador };