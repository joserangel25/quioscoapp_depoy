import { PrismaClient } from "@prisma/client"



export default async function handler(req, res) {
  const prisma = new PrismaClient()

  if(req.method === 'POST'){
    const orden = await prisma.orden.create({
      data : {
        nombre: req.body.nombreCliente,
        total: req.body.totalPagar,
        fecha: req.body.fecha,
        pedido: req.body.pedido
      }
    })
    res.json(orden)
  } 
}