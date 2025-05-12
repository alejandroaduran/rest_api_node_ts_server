import { object, string, number, boolean,  type Output, array, optional } from "valibot"

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: optional (boolean()),
})

export const ProductsSchema = array(ProductSchema)

export type Product = Output<typeof ProductSchema>
