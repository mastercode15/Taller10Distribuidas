// LLAMAR AL MODULO DE EXPRESS
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

// LLAMAR A LAS RUTAS DEL SERVIDOR 
import producto from './routes/producto';
import categoria from './routes/categoria';

// CLASE 
class Server 
{
    // ESPECIFICAR EL TIPO DE DATO PARA LA VARIABLE APP
    public app: express.Application;

    constructor()
    {
        // INICIALIZAR AL MODULO EXPRESS
        this.app = express();
        this.config();
        this.routes();
    }

    config(){
        // INICIALIZAR EL PUERTO DE EXPRESS
        this.app.set('port', process.env.PORT || 3000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan('dev'));
        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb://localhost:27017/cafe'
        mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true}).then(()=>{
            console.log("BDD OK");
        });
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express.urlencoded({extended:false}));
    }

    
    routes(){
        this.app.use('/api/producto',producto);
        this.app.use('/api/categoria',categoria);

    }

    start(){
        // INICIALIZAR EL SERVIDOR DE EXPRESS
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO EN EL PUERTO 3000 OK ");
        });
    }
}

// INSTANCIAR LA CLASE
const server = new Server();
server.start();



