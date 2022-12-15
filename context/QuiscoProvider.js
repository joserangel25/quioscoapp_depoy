import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import axios from 'axios'

export const QuiscoContext = createContext()

export default function QuiscoProvider({children}) {

  const [ categorias, setCategorias ] = useState([]);
  const [ categoriaActiva, setCategoriaActiva ] = useState({});
  const [ productoSeleccionado, setProductoSeleccionado ] = useState({});
  const [ modal, setModal ] = useState(false);
  const [ pedido, setPedido ] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getCategorias = async () => {
      const { data } = await axios('/api/categorias');
      setCategorias(data)
    }
    getCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActiva(categorias[0])
  }, [categorias])
  
  
  const handleClickCategoria = id => {
    const [categoriaSeleccionada] = categorias.filter(cat => cat.id === id)
    setCategoriaActiva(categoriaSeleccionada)
    router.push('/')
  }

  const handleSetProducto = producto => setProductoSeleccionado(producto);

  const showModal = () => setModal(!modal);

  const handleAgregarPedido = ({categoriaId, ...producto}) => {
    if(pedido.some(productoState => productoState.id === producto.id)){
      const pedidosActualizados = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
      setPedido(pedidosActualizados)
      toast.success('Producto actualizado en el pedido')
    } else {
      setPedido([...pedido, producto])
      toast.success('Agregado al pedido')
    }

    setModal(false)
  }

  const handleEditarProducto = id => {
    const productoActualizar = pedido.filter(producto => producto.id === id);
    setProductoSeleccionado(productoActualizar[0]);
    showModal()
  }

  const handleElimiarProducto = id => {
    const confirmacion = confirm('Está seguro que desea eliminar este producto?');
    if(confirmacion){
      const pedidosActualizados = pedido.filter(producto => producto.id !== id);
      setPedido(pedidosActualizados)
      toast.success('Producto eliminado del pedido')
    } else {
      toast.error('Descartado', { autoClose: 1000 })
    }
  }

  const confirmarOrden = async (orden) => {
    orden.fecha = Date.now().toString()
    try {
      await axios.post('/api/ordenes', orden)
      setPedido([])

      setTimeout(() => {
        toast.success('Pedido enviado', {autoClose: 1500})
      }, 1300)
      
      setTimeout(() => {
        setCategoriaActiva(categorias[0])
        router.push('/')
      }, 3100);

    } catch (error) {
      setTimeout(() => {
        toast.error('Ha ocurrido un error. Inténtalo de nuevo!', {autoClose: 2000})
      }, 1400)
      console.log(error)
    }
  }

  const value = {
    categorias,
    categoriaActiva,
    handleClickCategoria,
    productoSeleccionado,
    handleSetProducto,
    modal,
    showModal,
    handleAgregarPedido,
    pedido,
    handleEditarProducto,
    handleElimiarProducto,
    confirmarOrden
  }
  return (
    <QuiscoContext.Provider value={value}>
      {children}
    </QuiscoContext.Provider>
  )
}
