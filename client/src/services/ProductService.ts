import axios from "axios";
import { DraftProductSchema } from "../types";
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