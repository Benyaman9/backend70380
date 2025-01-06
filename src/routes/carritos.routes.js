import { Router } from "express";
import { getCart, createCart, insertProductCart, updateProductsCart, updateQuantityProductCart, deleteCart, deleteProductCart } from "../controllers/carts.controllers.js";

const cartRouter = Router()



//consultar prod guardados en un carrito
cartRouter.get('/:cid', getCart)
//crear nuevo carrito
cartRouter.post('/', createCart)
    

//agregar nueo prod al carrito
cartRouter.post('/:cid/products/:pid', insertProductCart)


cartRouter.put('/:cid', updateProductsCart) // modif totalmente el array de productos del carro
cartRouter.put('/:cid/products/:pid', updateQuantityProductCart)// actualizao cant de prod
cartRouter.delete('/:cid', deleteCart) // elimino todos los prod
cartRouter.delete('/:cid/products/:pid', deleteProductCart) //elimino un prod del carrito

    

export default cartRouter

//676f5259aea4f95db7bfc1aa