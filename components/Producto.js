import Image from "next/image";
import { formatearDinero } from "../helpers";
import { useQuiosco } from "../hooks/useQuiosco";

export default function Producto({producto}) {
  const { nombre, imagen, precio } = producto;
  const { handleSetProducto, showModal } = useQuiosco();
  return (
    <div className="border p-3 hover:scale-105 duration-500">
      <Image 
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen platillo ${nombre}`}
        width={300}
        height={400}
        className='mx-auto'
      />

      <div className="p-5">
        <h3 className="font-bold text-2xl">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-600">{ formatearDinero(precio) }</p>
      </div>

      <button
        type="button"
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
        onClick={() => {
          handleSetProducto(producto)
          showModal()
        }}
      >Agregar</button>
    </div>
  )
}
