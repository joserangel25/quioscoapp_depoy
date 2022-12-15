import { useContext } from 'react'
import { QuiscoContext } from '../context/QuiscoProvider'

export const useQuiosco = () => {
  return useContext(QuiscoContext)
}