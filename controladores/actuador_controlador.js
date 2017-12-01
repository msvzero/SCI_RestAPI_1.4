const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')
const _ = require('lodash');
const { Actuador } = require('../model/Actuador');
const { loginRequired } = require('../controladores/usuario_controlador');

//Crear un actuador.
exports.crearActuador = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })
    } else {
        let actuador = new Actuador ({
            ubicacion: request.body.ubicacion,
            modelo: request.body.modelo,
            modos_canales: {
                canal_1: "apagado",
                canal_2: "apagado",
                canal_3: "apagado",
                canal_4: "apagado",
                canal_5: "apagado",
                canal_6: "apagado",
            }
        });
        actuador.save().then((actuador) => {
            response.send(actuador)
        }, (error) =>{
            response.status(400).send(error);
        });
    }

});
//Obtener lista de actuadores.
exports.obtenerActuadores = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })   
    } else {
        Actuador.find().then((actuadores) => {
            response.send({actuadores});
        }, (error) => {
            response.status(400).send(error);
        });
    }
});
//Obtener actuador por id.
exports.obtenerActuadorId = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })    
    } else {
        let id = request.params.id;
        if(!ObjectID.isValid(id)){
            return response.status(404).send();
        }
        Actuador.findById(id).then((actuador) => {
           if(!actuador){
               return response.status(404).send();
           } 
           let actuadorData = {
               "ubicacion": actuador.ubicacion,
               "modos_canales": actuador.modos_canales,
               "iluminacionExterna": actuador.iluminacionExterna,
               "canales": actuador.canales
           }
           response.send(actuadorData);
        }, (error) => {
            response.status(404).send();
        });        
    }
});
//Obtener actuador por ubicacion.
exports.obtenerActuadorUbicacion = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })    
    } else {
        let ubicacion = request.params.ubicacion;
        Actuador.find({ubicacion: ubicacion}).then((actuador) => {
            response.send({actuador});
        }, (error) => {
            response.status(400).send(error);
        });       
    }
});
//Actualizar iluminacion y movimiento del actuador.
exports.actualizarDatosActuador = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })   
    } else {
        let id = request.params.id;
        let nivelIluminacion = request.params.iluminacion;
        if(!ObjectID.isValid(id)){
            return response.status(404).send();
        }
        Actuador.findByIdAndUpdate(id, { $set: { iluminacionExterna: nivelIluminacion}}, {new: true}).then((actuador) => {
            if(!actuador){
                return response.status(404).send();
            }
            //response.send({capturador});
            console.log(`Actuador: ${id} - Nivel de Iluminacion del exterior: ${nivelIluminacion}`);
            response.status(200).send();
        }).catch((error) => {
            response.status(400).send();
        })
    }
});
//Actualizar modo de funcionamiento de un canal del actuador.
exports.actualizaCanalModo  = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })   
    } else {
        let modoFuncionamiento = request.body.modo;
        let canal = request.body.canal;
        let id = request.params.id;
        let dynSet = {$set: {}};
        dynSet.$set["modos_canales." + canal] = modoFuncionamiento;
    
        if(!ObjectID.isValid(id)){
            return response.status(404).send();
        }
    
        Actuador.findByIdAndUpdate(id, dynSet, {new: true}).then((actuador) => {
            if(!actuador){
                return response.status(404).send();
            }
            response.status(200).send();
        }).catch((error) => {
            response.status(400).send();
        })
    }
})