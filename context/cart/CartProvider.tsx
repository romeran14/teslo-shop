import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie'

export interface CartState {
    cart:ICartProduct[];
}

const Cart_INITIAL_STATE: CartState = {
    cart:[],
}


const CartProvider:FC<PropsWithChildren> = ({children}) => {
  

    const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE)

    useEffect(() => {
      try {
          const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
          dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
      } catch (error) {
          dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
      }
  }, []);

  
  useEffect(() => {
    Cookie.set('cart', JSON.stringify( state.cart ));
  }, [state.cart]);

    const addProductToCart = ( product: ICartProduct ) => {

      const productInCart = state.cart.some( p => p._id === product._id );
      if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

      const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size );
      if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

      // Acumular
      const updatedProducts = state.cart.map( p => {
          if ( p._id !== product._id ) return p;
          if ( p.size !== product.size ) return p;

          // Actualizar la cantidad
          p.quantity += product.quantity;
          return p;
      });

      dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

  }



  return (
  <CartContext.Provider value={{
    ...state,
  //methods
  addProductToCart

  }}>
    {children}
  </CartContext.Provider>
  )
}

export default CartProvider