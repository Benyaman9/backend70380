import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'products' //este id se refiere a un id de un objeto de la coleccion products
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        default: []
    }
})
// cada vez que ejcuto finOne me manejo via populate 
cartSchema.pre('findOne', function() {
    this.populate('products.id_prod')
})
const cartModel = model("carts", cartSchema)
export default cartModel