import { useRouter } from "next/router"
import { useRef } from "react";

const pasos = [
  {
    paso: 1, nombre: 'Menu', url: '/'
  },
  {
    paso: 2, nombre: 'Resumen', url: '/resumen'
  },
  {
    paso: 3, nombre: 'Confirmación', url: '/total'
  },
]
export default function Pasos() {


  const router = useRouter();
  const refPasos = useRef();

  const calcularProgreso = () => {
    let valor;

    if(router.pathname === '/'){
      valor = 2
    } else if(router.pathname === '/resumen'){
      valor = 50
    } else {
      valor = 100
    }

    return valor
  }

  const scroll = () => {
  window.scrollTo({
    top: refPasos.current.offsetTop,
    behavior: 'smooth',
  });
};

  return (
    <>
      <div
        ref={refPasos} 
        className="flex flex-col md:flex-row justify-between mb-5"
      >
        {
          pasos.map(paso => (
            <button 
              key={paso.paso}
              className={`${router.pathname === paso.url ? 'text-amber-500' : ''} text-2xl font-bold`}
              onClick={() => {
                router.push(paso.url)
                // scroll()
              }}
            >
              {paso.nombre}
            </button>
          ))
        }
      </div>

      <div className="bg-gray-100 mb-10">
        <div 
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10"
          style={{width: `${calcularProgreso()}%`}}
        ></div>
      </div>
    </>
  )
}
