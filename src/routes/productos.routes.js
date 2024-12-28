import { Router } from "express";


import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.controllers.js";


const productRouter = Router()

// Consultar productos
productRouter.get('/',getProducts)

// Consultar producto via ID
productRouter.get('/:pid', getProduct)

//Crear un nuevo producto
productRouter.post('/', createProduct )

//Actualiza un producto dado su id y pido los datos a actualizar del cuerpo de la peticion
productRouter.put('/:pid', updateProduct )

//Elimina un producto dado su id
productRouter.delete('/:pid', deleteProduct)

export default productRouter


//  1c3bd5f30578872b6d05