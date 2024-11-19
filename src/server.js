import express from 'express'
import productRouter from './routes/productos.routes.js'
import { __dirname } from './path.js'
import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/imagenes.routes.js'


const app = express()
const PORT = 8080
// estos express.json y url encoded son middlewares de aplicacion por que son globales
app.use(express.json()) //Para manejar JSON en las peticiones
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname + '/public')) // defino carpeta publica como destino de archivos estaticos
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use('/upload', multerRouter)



app.listen(PORT, () => {
    console.log("Server on port", PORT)
})