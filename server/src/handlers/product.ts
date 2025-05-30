import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    try {

        const products = await Product.findAll({
            order: [
                ["price", "ASC"]
            ],
            attributes: { exclude: ["createdAt", "updatedAt", "availability"] },
        })
        res.json({ data: products })
    } catch (error) {

        console.log(error)

    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("desde getProductById")
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" })
            return
        }

    } catch (error) {

        console.log(error)

    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" })
            return
        }

        await product.update(req.body)
        await product.save()
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" })
            return
        }
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            res.status(404).json({ message: "Producto no encontrado" })
            return
        }

        await product.destroy()
        res.json({ message: "Producto eliminado" })
    } catch (error) {
        console.log(error)
    }
}