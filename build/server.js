"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// LLAMAR AL MODULO DE EXPRESS
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
// LLAMAR A LAS RUTAS DEL SERVIDOR 
const producto_1 = __importDefault(require("./routes/producto"));
const categoria_1 = __importDefault(require("./routes/categoria"));
// CLASE 
class Server {
    constructor() {
        // INICIALIZAR AL MODULO EXPRESS
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        // INICIALIZAR EL PUERTO DE EXPRESS
        this.app.set('port', process.env.PORT || 3000);
        // VER LAS RUTAS QUE SE ESTAN SOLICITANDO 
        this.app.use(morgan_1.default('dev'));
        // CONEXIÓN A LA BDD
        const MONGO_URI = 'mongodb+srv://sebas:sebas123@cluster0.qw2ct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
            console.log("BDD OK");
        });
        // COMPRESIÓN DE LAS RESPUESTAS
        this.app.use(compression_1.default());
        // PARA LA CONEXIÓN CON EL FRONTEND
        this.app.use(cors_1.default());
        // RECIBIR Y ENVIAR LAS RESPUESTAS DE TIPO JSON
        this.app.use(express_1.default.json());
        // SOPORTE PARA EL ENVIO DE FORMULARIOS
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categoria', categoria_1.default);
    }
    start() {
        // INICIALIZAR EL SERVIDOR DE EXPRESS
        this.app.listen(this.app.get('port'), () => {
            console.log("SERVIDOR FUNCIONANDO EN EL PUERTO 3000 OK ");
        });
    }
}
// INSTANCIAR LA CLASE
const server = new Server();
server.start();
