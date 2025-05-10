import type { PropsWithChildren } from "react";


export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className="text-center my-4 bg-red-600 text-white p-3 rounded-md uppercase">
        {children}
    </div>
  )
}
