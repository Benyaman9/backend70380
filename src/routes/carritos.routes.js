import { Router } from "express";
import crypto from "crypto";
import { __dirname } from "../path.js";
import { promises as fs } from 'fs';
import path from "path";

const cartRouter = Router()

const carritosPath = path.resolve(__dirname, '../src/db/carritos.json');
//leer el archivo
const carritosData = await fs.readFile(carritosPath,'utf-8') //arranca desde la carpeta inicial

const carritos = JSON.parse(carritosData);

//consultar prod guardados en un carrito
cartRouter.get('/:cid', (req, res) =>{
    const idCarrito = req.params.cid
    const carrito = carritos.find(cart => cart.id == idCarrito)

    if (carrito) {
        console.log(carrito);
        res.status(200).send(carrito.products)
    } else {
        res.status(404).send({ mensaje: "El carrito no existe" })
    }
})
//crear nuevo carrito
cartRouter.post('/', async (req, res) =>{
    const newCart ={
        id: crypto.randomBytes(5).toString('hex'),
        products : []

    }
    carritos.push(newCart)
    await fs.writeFile(carritosPath, JSON.stringify(carritos))
    res.status(200).send(`carrito creado correctamente con el id ${newCart.id}`)
})
//agregar nueo prod al carrito
cartRouter.post('/:cid/products/:pid', async (req, res) =>{
    const idCarrito = req.params.cid
    const idProducto = req.params.pid
    const {quantity} = req.body
    const carrito = carritos.find(cart => cart.id == idCarrito)

    if (carrito) {
    const indice = carrito.products.findIndex(prod => prod.id == idProducto)
    if(indice != -1){  //si existe el prod lo piso con la nueva cantidad
        carrito.products[indice].quantity = quantity
    }else {
        carrito.products.push({id: idProducto, quantity: quantity})
    }
    await fs.writeFile(carritosPath, JSON.stringify(carritos))
        res.status(200).send("carrito actualiza3 correctamen3")
    } else {
        res.status(404).send({ mensaje: "El carrito no existe" })
    }
})

export default cartRouter

