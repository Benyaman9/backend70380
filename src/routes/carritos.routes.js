import { Router } from "express";
import { getCart, createCart, insertProductCart } from "../controllers/carts.controllers.js";

const cartRouter = Router()



//consultar prod guardados en un carrito
cartRouter.get('/:cid', getCart)
//crear nuevo carrito
cartRouter.post('/', createCart)
    

//agregar nueo prod al carrito
cartRouter.post('/:cid/products/:pid', insertProductCart)

    

export default cartRouter

//676f5259aea4f95db7bfc1aa