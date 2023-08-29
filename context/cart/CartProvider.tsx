import { FC, PropsWithChildren, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';

export interface CartState {
    cart:ICartProduct[];
}

const Cart_INITIAL_STATE: CartState = {
    cart:[],
}


const CartProvider:FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE)

  return (
  <CartContext.Provider value={{...state}}>
    {children}
  </CartContext.Provider>
  )
}

export default CartProvider