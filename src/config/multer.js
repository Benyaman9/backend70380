import multer from "multer";
import { __dirname } from "../path.js";

// esta es la configuracion para imagenes con multer
const storageProducts = multer.diskStorage({
// especifico donde se va a guardar la img subida
destination: (req, file, cb) =>{
cb(null, `${__dirname}/public/img/products`) //guardar img en esta carpeta
},
//pido nombre y fecha asi es un archivo unico
filename: (req, file, cb) =>{
cb(null, `${Date.now()}${file.originalname}`) //fecha actual y nombre original del archivo
    }
    
})



//middleware para utilizar a nivel de ruta
export const uploadProds = multer({storage: storageProducts})