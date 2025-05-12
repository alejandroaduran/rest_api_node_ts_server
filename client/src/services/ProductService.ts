import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../types";
import { safeParse } from "valibot";
type productData = { [k: string]: FormDataEntryValue }

export async function addProduct(data: productData) {
    //console.log(data);
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        });
        //console.log(result);
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`;
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error("Invalid data");
        }
    } catch (error) {
        console.error("Error adding product:", error);
    }

}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`;
        const { data } = await axios.get(url);
        const result = safeParse(ProductsSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error("Invalid data");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}