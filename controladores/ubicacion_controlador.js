const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')
const _ = require('lodash');
const { Ubicacion } = require('../model/Ubicacion');
const { loginRequired } = require('../controladores/usuario_controlador');

//Crear una ubicacion.
exports.crearUbicacion = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })
    }else{
        let ubicacion = new Ubicacion({
            descripcion: request.body.descripcion,
            canal: request.body.canal,
            actuador: request.body.actuador,
        });
    
        ubicacion.save().then((ubicacion) => {
            response.send(ubicacion);
        }, (error) => {
            response.status(400).send(error);
        })
    }
});
//Obtener todas las ubicaciones.
exports.obtenerUbicaciones = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })
    }else{
        Ubicacion.find().then((ubicaciones) => {
            response.send({ubicaciones});
        }, (error) => {
            response.status(400).send(error);
        });
    }
});
//Actualizar modo de funcionamiento de una ibicacion.
exports.actualizarDatosUbicacion = ((request, response) => {
    if(!loginRequired(request)) {
        return response.status(401).json({
            mensaje: 'Usuario no autorizado'
        })
    }else{
        let id = request.params.id;
        let modo = request.body.modo;
        if(!ObjectID.isValid(id)){
            return response.status(404).send();
        }
        Ubicacion.findByIdAndUpdate(id, { $set: { modo: modo}}, {new: true}).then((ubicacion) => {
            if(!ubicacion){
                return response.status(404).send();
            }
            response.status(200).send();
        }).catch((error) => {
            response.status(400).send();
        });
    }
});

