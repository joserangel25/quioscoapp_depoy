import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import Modal from "react-modal";

import { useQuiosco } from "../hooks/useQuiosco";
import { formatearDinero } from '../helpers'

const customStyles = {
  top: '10%',
  left: '10%',
  // right: 'auto',
  // bottom: 'auto',
  // marginRight: '-50%',
  // transform: 'translate(-50%, -50%)'
  backgroundColor: 'papayawhip'
}

export default function Total() {

  const { pedido, confirmarOrden } = useQuiosco();
  const [ nombreCliente, setNombreCliente ] = useState('');
  const [ modalTotal, setModalTotal ] = useState(false);

  useEffect(() => {
      
    return () => {
      setNombreCliente('')
    }
  }, [])


  const calcularTotal = () => {
    return pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
  }

  const comprobarOrden = () => pedido.length === 0 || nombreCliente === '' || nombreCliente.length < 3

  const handleConfirmarOrden = (e) => {
    e.preventDefault()
    
    if(pedido.length === 0 || !nombreCliente) return

    confirmarOrden({ 
      nombreCliente,
      totalPagar: calcularTotal(),
      pedido  
    })
    setModalTotal(true)

    setTimeout(() => {
      setModalTotal(false)
    }, 1500);
  }

  return (
    <Layout pagina='Total y Confirmar'>
      <h1 className="text-3xl font-black">Total y Confirmación</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

      <form
        onSubmit={handleConfirmarOrden}
      >
        <div>
          <label
            htmlFor="nombre" 
            className="block uppercase font-bold text-slate-800">Nombre del cliente</label>
          <input
            id='nombre' 
            type='text'
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
          />
        </div>

        <div className="mt-10 text-xl">
          <p>Total a pagar: {''} <span className="font-bold">{ formatearDinero(calcularTotal())}</span> </p>
        </div>

        <input
          type='submit' 
          className={`${comprobarOrden() ? 'bg-indigo-300 hover:cursor-not-allowed' : 'bg-indigo-600 hover:cursor-pointer'} mt-5 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold 
          text-white text-center  outline-none`}
          value='Confirmar pedido'
          disabled={comprobarOrden()}
        />
      </form>
      <Modal
        isOpen={modalTotal}
      >
        <p>cargando...</p>
      </Modal>
    </Layout>
  )
}
