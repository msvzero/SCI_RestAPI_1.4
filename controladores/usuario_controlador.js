const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var { Usuario } = require('../model/Usuario');

exports.registro = (request, response) => {
    var nuevoUsuario = new Usuario(request.body);
    nuevoUsuario.hash_password = bcrypt.hashSync(request.body.password, 10);
    nuevoUsuario.save().then((usuario) => {
        response.send(usuario)
    }, (error) => {
        response.status(400).send(error);
    });

};


exports.sign_in = (request, response) => {
    Usuario.findOne({
        email: request.body.email
    }).then((usuario) => {
        if(!usuario){
            response.status(401).json({mensaje: 'Autenticacion fallida. Usuario no encontrado'});
        }else if(usuario){
            if(!usuario.comparaPassword(request.body.password)){
                response.status(401).json({mensaje: 'Autenticacion fallida. Password incorrecto'});
            }else{
                return response.json({token: jwt.sign({email: usuario.email, nombreCompleto: usuario.nombreCompleto, _id: usuario._id}, 'RESTFULAPIs')})
                
            }
        }
    }, (error) => {
        response.status(400).send(error);
    })

};

exports.loginRequired = (request) => {
    if(request.user){
        return true;
    }else{
        return false;
    }
};