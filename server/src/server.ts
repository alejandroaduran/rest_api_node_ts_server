import express from "express";
import colors from "colors"
import cors, { CorsOptions } from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
//import swaggerUi from "swagger-ui-express"
//import swaggerJsDoc from "swagger-jsdoc"
import router from "./router";
import db from "./config/db";

//conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log("conexion exitosa a la base de datos")
    } catch (error) {
        //console.log(error)
        //console.log(colors.bgRed.white("Error al conectar a la base de datos"))
    }

}

connectDB()

//instancia de express
const server = express()

//permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        //console.log(origin)
        if (origin === process.env.FRONTEND_URL) {
            //console.log("origen permitido")
            callback(null, true)
        } else {
            console.log("origen no permitido")
            callback(new Error("No permitido"))
        }
    }
}

server.use(cors(corsOptions))

//leer datos de formularios
server.use(express.json())

server.use("/api/products", router)

server.get("/api", (req, res) => {
    res.json({ msg: "Desde API" })

})

//docs
//server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server