import Image from "next/image";
import { useQuiosco } from "../hooks/useQuiosco";

export default function Categoria({categoria}) {

  const { categoriaActiva, handleClickCategoria } = useQuiosco();
  const { nombre, icono, id } = categoria;

  return (
    <div 
      className={`${categoriaActiva?.nombre === nombre ? 'bg-amber-400' : '' } 
                  flex items-center gap-4 w-full p-5 border hover:bg-amber-400`}
    >
      <Image 
        width={50}
        height={50}
        src={`/assets/img/icono_${icono}.svg`}
        alt='Imaagen icono'
      />

      <button
        type="button"
        className="text-2xl font-bold hover:cursor-pointer"
        onClick={() => handleClickCategoria(id)}
      >
        {nombre}
      </button>
    </div>
  )
}
