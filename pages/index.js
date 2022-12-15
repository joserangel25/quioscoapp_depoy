// import { PrismaClient } from "@prisma/client"

import Producto from "../components/Producto";
import { useQuiosco } from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function Home() {
  const { categorias, categoriaActiva } = useQuiosco();
  
  return (
    <Layout pagina={`Menú ${categoriaActiva?.nombre}`}>
      {
        (categorias.length > 0) && <h1 className="text-3xl font-black">{categoriaActiva?.nombre}</h1>
      }
      <p className="my-10 text-xl">Elige y personaliza tu pedido a continuación</p>
      <div class=" grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {
        categoriaActiva?.productos?.map( producto => (
          <Producto 
            key={producto.id}
            producto={producto}
          />
        ))
      }
      </div>
    </Layout>
  )
}

// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient();

//   const categorias = await prisma.categoria.findMany()
//   // console.log(categorias)
//   return {
//     props: {
//       categorias
//     }
//   }
// }