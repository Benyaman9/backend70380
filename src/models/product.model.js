import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const productSchema = new Schema({
    title: {
        type: String,
        required: true // si o si el usuario debe ingresar el title
    },
    description: {
        type: String,
        required: true 
    },
    category: {
        type: String,
        required: true, 
        index: true
    },
    status: {
        type: Boolean,
        default: true
    },
    price:{
        type: Number,
        required: true 
    },
    stock: {
        type: Number,
        required: true 
    },
    code: {
        type: String,
        required: true ,
        unique: true
    },
    thumbnail:{
        default: []
    }
})
productSchema.plugin(mongoosePaginate) //agrego a paginate como un plugin del schemaproduct
const productModel = model("products", productSchema)
export default productModel