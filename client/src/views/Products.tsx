import { Link } from "react-router-dom"
import { getProducts } from "../services/ProductService"

export async function loader() {
  const products = await getProducts()
  return null
}


export default function Products() {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500"> Productos</h2>
        <Link
          to={"/productos/nuevo"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
        >
          Agregar Productos
        </Link>
      </div>
    </>
  )
}
