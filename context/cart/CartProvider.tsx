import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie'

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const Cart_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0

}


const CartProvider: FC<PropsWithChildren> = ({ children }) => {


  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE)

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
      dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
    } catch (error) {
      dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
    }
  }, []);


  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {

    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
    const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
    const taxtRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxtRate,
      total: subTotal * (taxtRate + 1),
    }

    dispatch({type:'[Cart] - Update Order Summary',payload: orderSummary}, )
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {

    const productInCart = state.cart.some(p => p._id === product._id);
    if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

    const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
    if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

    // Acumular
    const updatedProducts = state.cart.map(p => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

  }


  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[Cart] - Change Product quantity', payload: product })
  }

  const removeCartProduct = (product: ICartProduct) => {
    console.log(product)
    dispatch({ type: '[Cart] - Remove Product in cart', payload: product })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      //methods
      addProductToCart,
      updateCartQuantity,
      removeCartProduct
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider