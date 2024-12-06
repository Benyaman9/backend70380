import express from 'express'
import { create } from 'express-handlebars'
import { Server } from 'socket.io'
import path from 'path'
import { __dirname } from './path.js'
import productRouter from './routes/productos.routes.js'

import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/imagenes.routes.js'
import chatRouter from './routes/chat.routes.js'


const app = express()
const hbs = create()
const PORT = 8080

const server =
    app.listen(PORT, () => {
        console.log("Server on port", PORT)
    })

//inicializo socket.io en el servidor
const io = new Server(server)

//Middlewares de aplicacion
app.use(express.json()) //Para manejar JSON en las peticiones
app.use(express.urlencoded({ extended: true }))
//Configuracion de hbs para localizacion de plantillas y extension de archivo
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//Establezco el directorio de las vistas


app.set('views', path.join(__dirname, '/views'))


//app.set('views',__dirname + '/src/views')

app.use('/public', express.static(__dirname + '/public'))
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/chat', chatRouter)
app.use('/upload', multerRouter)
const productos = [
    { nombre: "Chocolate", marca: "Chocolatin", precio: 2450, stock: 12, status: true },
    { nombre: "Hamburguesa", marca: "Hamburguesin", precio: 2230, stock: 22, status: true },
    { nombre: "Arroz", marca: "Arrocin", precio: 1330, stock: 42, status: false }
]
// res.render('nombre-plantilla, {objetos a enviar})
app.get('/', (req, res) => {
    res.render('templates/productos', { productos: productos, js:'productos.js', css: 'productos.css' })
})
let mensajes = []
//conexiones de socket.io
// socket= info que llega de la conexion
io.on('connection', (socket) => {  //se ejecuatan las funciones cuando se produce el apreton de manos

    console.log('Usuario conectado', socket.id); //id de conexion, no es el mismo de la base de datos
    
    
    socket.on('mensaje', (data) => { //el usuario envia msj ,trabajo con esos datos
        console.log('mesaje recibido', data);
        mensajes.push(data)
        //enviar un msj
        socket.emit('respuesta', mensajes)



    
    })
    //detectar desconexion
    socket.on('disconnect', ()=>{
        console.log('usuario desconectado', socket.id);
        
    })
})



