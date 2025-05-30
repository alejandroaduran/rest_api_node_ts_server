import { Link, Form, useActionData, type ActionFunctionArgs, redirect, type LoaderFunctionArgs, useLoaderData/* useLocation */ } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct, getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";

export async function loader({ params }: LoaderFunctionArgs) {
    //console.log(params.id);
    if (params.id !== undefined) {
        const product = await getProductById(+params.id)
        console.log(product);
        if (!product) {
            //throw new Response("", { status: 404, statusText: "Producto no encontrado" })
            return redirect("/");
        }
        return product
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    //console.log(data);
    let error = ""
    if (Object.values(data).includes("")) {
        error = "Todos los campos son obligatorios"
    }
    if (error.length) {
        return error
    }
    await updateProduct(data, params.id ? +params.id : 0);

    return redirect("/");
}

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]
export default function EditProduct() {

    const product = useLoaderData() as Product;

    const error = useActionData();
    //console.log(error);
    /*  const {state} = useLocation();
     console.log(state); */

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                    to={"/"}
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
                >
                    Volver a Productos
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form
                className="mt-10"
                method="post"
            >

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                        //defaultValue={state.product.name}
                        defaultValue={product.name}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="price"
                    >Precio:</label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                        defaultValue={product.price}
                    //defaultValue={state.product.price || ""}
                    />
                </div>



                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability?.toString() || "false"}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
