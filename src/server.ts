import express from "express";
import colors from "colors"
import router from "./router";
import db from "./config/db";

//conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log("conexion exitosa a la base de datos")
    } catch (error) {
        console.log( error)
        console.log(colors.bgRed.white("Error al conectar a la base de datos"))
    }

}

connectDB()

const server = express()

server.use("/api/products", router)

export default server