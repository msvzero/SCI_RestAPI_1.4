const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb')
const _ = require('lodash');
const { mongoose } = require('./db/conexion');
const jsonwebtoken = require('jsonwebtoken');


const usuarioControlador = require('./controladores/usuario_controlador');
const actuadorControlador = require('./controladores/actuador_controlador'); 
const ubicacionControlador = require('./controladores/ubicacion_controlador');

var app = express();
app.use(bodyParser.json());
app.use((request, response, next) => {
    if(request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwebtoken.verify(request.headers.authorization.split(' ')[1], 'RESTFULAPIs', (error, decode) => {
            if (error) request.user = undefined;
            request.user = decode;
            next();
        })

    }else{
        request.user = undefined;
        next();
    }

});

/**-------------------Usuarios--------------------------------- */
app.post('/auth/registro', (request, response) => {
    usuarioControlador.registro(request, response);
});

app.post('/auth/login', (request, response) => {
    usuarioControlador.sign_in(request, response);
});
/**-------------------Usuarios--------------------------------- */
/**-------------------Actuadores--------------------------------- */
app.post('/actuadores', (request, response) => {
    actuadorControlador.crearActuador(request, response);
});
app.get('/actuadores', (request, response) =>{
    actuadorControlador.obtenerActuadores(request, response);
});
app.get('/actuadores/:id', (request, response) => {
     actuadorControlador.obtenerActuadorId(request, response);
});
app.get('/actuadores/ubicacion/:ubicacion', (request, response) =>{
    actuadorControlador.obtenerActuadorUbicacion(request, response);
})
app.put('/actuadores/:id/:iluminacion/', (request, response) => {
    actuadorControlador.actualizarDatosActuador(request, response);
});

app.put('/actuadores/:id/', (request, response) => {
    actuadorControlador.actualizaCanalModo(request, response);
});
/**-------------------Actuadores--------------------------------- */
/**-------------------Ubicaciones--------------------------------- */
app.post('/ubicaciones', (request, response) => {
    ubicacionControlador.crearUbicacion(request, response);

});
app.get('/ubicaciones', (request, response) => {
    ubicacionControlador.obtenerUbicaciones(request, response);
});
app.put('/ubicaciones/:id', (request, response) => {
    ubicacionControlador.actualizarDatosUbicacion(request, response);
});
/**-------------------Ubicaciones--------------------------------- */
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

