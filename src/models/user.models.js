import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    username: String, //una sola caracteristica, es el tipo.

    email: {
        type: String,
        unique: true // como es unico ya tiene implementado el indice por defecto
    }
})                      //nombre de la coleccion y esquema a utilizar
export const userModel =model("users", userSchema)