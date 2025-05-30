import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";
const router = Router()

//Routing
router.get("/", getProducts)
router.get("/:id",
    param("id").isInt().withMessage("El id debe ser un numero entero"),
    handleInputErrors,
    getProductById
)

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

router.put("/:id",
    param("id").isInt().withMessage("El id debe ser un numero entero"),
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede estar vacio"),

    body("price")
        .isNumeric().withMessage("valor no valido")
        .notEmpty().withMessage("El precio del producto no puede estar vacio")
        .custom(value => value > 0).withMessage("precio no valido"),
    body("availability")
        .isBoolean().withMessage("El valor de disponibilidad debe ser true o false"),
    handleInputErrors,
    updateProduct,
)

router.patch("/:id",
    param("id").isInt().withMessage("El id debe ser un numero entero"),
    handleInputErrors,
    updateAvailability
)

router.delete("/:id",
    param("id").isInt().withMessage("El id debe ser un numero entero"),
    handleInputErrors,
    deleteProduct
)

export default router 