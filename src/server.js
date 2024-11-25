import express from 'express'
import { create } from 'express-handlebars'
import path from 'path'
import { __dirname } from './path.js'
import productRouter from './routes/productos.routes.js'

import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/imagenes.routes.js'


const app = express()
const hbs = create()
const PORT = 8080

//Middlewares de aplicacion
app.use(express.json()) //Para manejar JSON en las peticiones
app.use(express.urlencoded({extended: true}))
//Configuracion de hbs para localizacion de plantillas y extension de archivo
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//Establezco el directorio de las vistas




app.use('/static', express.static(__dirname + '/public'))//Defino la carpeta publica como destino de los archivos estaticos
app.set('views', path.join(__dirname, '/views'))
console.log(__dirname);

//app.set('views',__dirname + '/src/views')

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use('/upload', multerRouter)



app.listen(PORT, () => {
    console.log("Server on port", PORT)
})