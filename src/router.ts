import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";
const router = Router()

//Routing
router.get("/", (req, res) => {
    res.json("desde GET")
})

router.post("/",
    //validacion de datos   
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede estar vacio"),

    body("price")
        .isNumeric().withMessage("valor no valido")
        .notEmpty().withMessage("El precio del producto no puede estar vacio")
        .custom(value => value > 0).withMessage("precio no valido"),
    handleInputErrors,
    createProduct
)

router.put("/", (req, res) => {
    res.json("desde PUT")
})

router.patch("/", (req, res) => {
    res.json("desde PATCH")
})

router.delete("/", (req, res) => {
    res.json("desde DELETE")
})

export default router 