import axios from "axios";
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types";
import { coerce, number, parse, safeParse } from "valibot";
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

        // Log the API response
        console.log("API Response:", data);

        const result = safeParse(ProductsSchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            console.error("Validation Error:", result.error);
            throw new Error("Invalid data");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function getProductById(id: Product["id"]) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.get(url);

        // Log the API response
        console.log("API Response:", data);

        const result = safeParse(ProductSchema, data.data);
        if (result.success) {
            console.log("Parsed Product:", result.output);
            return result.output;
        } else {
            console.log("Validation Error");
            throw new Error("Invalid data");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export async function updateProduct(data: productData, id: Product["id"]) {
    try {
        const NumberSchema = coerce(number(), Number)
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: data.availability === "true" ? true : false
        })
        //console.log(result);
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.output)
        }
    } catch (error) { }
}