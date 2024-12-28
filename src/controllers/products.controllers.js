import productModel from "../models/product.model.js";

export const getProducts = async (req, res)=>{
try {
    const {limit} = req.query
    const prods = await productModel.find().limit(limit)
    console.log(prods);
    
    res.status(200).render('templates/home', { productos: prods, js:'productos.js', css: 'productos.css' })
} catch (e) {
    
    res.status(500).send("Error al consultar productos", e)
}
}

export const getProduct = async (req, res) =>{
try {
    const idProd = req.params.pid
    const prod = await productModel.findById(idProd)
    if(prod)
        res.status(200).send(prod)
    else
    res.status(404).send( "Producto no existe")
} catch (e) {
    
    res.status(500).send("Error al consultar producto", e)
}
}


export const createProduct = async (req, res) =>{
    try {
        const product = req.body
        const respuesta = await productModel.create(product)
        console.log(respuesta);
    res.status(201).send("Producto creado correctamente")
    } catch (e) {
        console.log(e)
        res.status(500).send("Error al crear producto", e)
    }
}

export const updateProduct = async (req, res) =>{
    try {
        const idProd = req.params.pid
        const updateProduct = req.body
        const respuesta = await productModel.findByIdAndUpdate(idProd, updateProduct)
        res.status(200).send("producto actualizado correctamente!!")
    } catch (e) {
        console.log(e)
        res.status(500).send("Error al actualizar producto", e)
    }
}


export const deleteProduct = async (req, res) =>{
    try {
        const idProd = req.params.pid
        const respuesta = await productModel.findByIdAndDelete(idProd)
        res.status(200).send("producto eliminado correctamente!!")
    } catch (e) {
        
        res.status(500).send("Error al eliminar producto", e)
    }
}

/*

import { Router } from "express";
import crypto from "crypto"
import { __dirname } from "../path.js";
import { promises as fs } from 'fs';
import path from "path";


const productRouter = Router()
const productosPath = path.resolve(__dirname, '../src/db/productos.json');
//leer el archivo
const productosData = await fs.readFile(productosPath,'utf-8') //arranca desde la carpeta inicial

const productos = JSON.parse(productosData);



// Consultar producto via ID
productRouter.get('/:pid', (req, res) => {
    const idProducto = req.params.pid
    const producto = productos.find(prod => prod.id == idProducto)

    if (producto) {
        res.status(200).send(producto)
    } else {
        res.status(404).send({ mensaje: "El producto no existe" })
    }
})

//Crear un nuevo producto
productRouter.post('/', async (req, res) => {
    const { title, description, code, price, category, stock } = req.body
    const nuevoProducto = {
        id: crypto.randomBytes(10).toString('hex'), //Me genera un id unico
        title: title,
        description: description,
        code: code,
        category: category,
        price: price,
        stock: stock,
        status: true,
        thumbnails: []
    }
    productos.push(nuevoProducto)
    await fs.writeFile(productosPath, JSON.stringify(productos))
    res.status(201).send({ mensaje: `Producto creado correctamente con el id: ${nuevoProducto.id}` })
})

//Actualiza un producto dado su id y pido los datos a actualizar del cuerpo de la peticion
productRouter.put('/:pid', async (req, res) => {
    const idProducto = req.params.pid
    const { title, description, code, price, category, stock, thumbnails, status} = req.body
    const indice = productos.findIndex(prod => prod.id == idProducto)
    

    if (indice != -1) {
        productos[indice].title = title
        productos[indice].description = description 
        productos[indice].code = code 
        productos[indice].price = price
        productos[indice].stock = stock 
        productos[indice].status = status 
        productos[indice].category = category 
        productos[indice].thumbnails = thumbnails 
        await fs.writeFile(productosPath, JSON.stringify(productos))

        res.status(200).send({ mensaje: "Producto actualizado" })
    } else {
        res.status(404).send({ mensaje: "El producto no existe" })
    }
})

//Elimina un producto dado su id
productRouter.delete('/:pid', async (req, res) => {
    const idProducto = req.params.pid
    const indice = productos.findIndex(prod => prod.id == idProducto)
    if (indice != -1) {
        productos.splice(indice, 1)
        await fs.writeFile(productosPath, JSON.stringify(productos))
        res.status(200).send({ mensaje: 'Producto eliminado' })
    } else {
        res.status(404).send({ mensaje: "El producto no existe" })
    }
})

export default productRouter*/


//  1c3bd5f30578872b6d05