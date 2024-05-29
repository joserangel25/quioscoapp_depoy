import { categorias } from './data/categorias'
import { productos } from './data/productos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async (): Promise<void> => {
  try {
    await prisma.categoria.createMany({
      data: categorias
    })
    await prisma.producto.createMany({
      data: productos
    })
    console.log('datos creados en la DB')
  } catch (error) {
    console.log(error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit(1)
  })