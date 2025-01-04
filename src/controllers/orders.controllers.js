import orderModel from "../models/order.model.js";

export const getOrders = async (req, res)=>{
try {
    const {limit} = req.query
    const orders = await orderModel.aggregate([
        {
        $match: {size: "small"} // stage1 solamente pido las pizzas medianas
        },
        {
             //$group: {_id: "$name", totalQuantity: {$sum: "$quantity"}} // stage2 agrupo por nombre y por suma de cantidades
            $group: {_id: "$name", totalVentas: {$sum: "$price"}} // agrupamos por total de venta
        },
        {
            $sort: {totalQuantity: 1} // -1 =de mayor a menor y solo 1 es menor a mayor
        },
        {
            $group: {_id: 1, orders: {$push:"$$ROOT"}} //GUARDA TODO LO DEL ARRAY ANTERIOR
        },
        {
            $project: {
                "_id":0,
                orders: "$orders" // guardo en una coleccion "orders" el contenido y autogenero el id
            }
        },
        {
            $merge: {
                into: "reports" // guardame la coleccion reports de mi BDD
            }
        }
        
    ])
    console.log(orders);
    
    res.status(200).send("reportes generados")
} catch (e) {
    console.log(e)
    res.status(500).send("Error al consultar ordenes:")
}
}




export const createOrder = async (req, res) =>{
    try {
        const order = req.body
        const respuesta = await orderModel.create(order)
        console.log(respuesta);
    res.status(201).send("orden creado correctamente")
    } catch (e) {
        console.log(e)
        res.status(500).send("Error al crear orden", e)
    }
}

