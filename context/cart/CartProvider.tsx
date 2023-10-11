import { FC, PropsWithChildren, useReducer, useEffect } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie'
import { IOrder, shippingAddress } from '@/interfaces/order';
import { tesloApi } from '@/api';
import axios from 'axios';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isLoaded: boolean;
  shippingAddress?: shippingAddress;
}


const Cart_INITIAL_STATE: CartState = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  isLoaded: false,
  shippingAddress: undefined
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

    if (Cookie.get('firstName')) {
      const shippingAddress = {
        firstName: Cookie.get('firstName') || '',
        lastName: Cookie.get('lastName') || '',
        address: Cookie.get('address') || '',
        address2: Cookie.get('address2') || '',
        zip: Cookie.get('zip') || '',
        city: Cookie.get('city') || '',
        country: Cookie.get('country') || '',
        phone: Cookie.get('phone') || '',
      }

      dispatch({ type: '[Cart] - LoadAddreess From Cookies', payload: shippingAddress });
    }
  }, [])


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

    dispatch({ type: '[Cart] - Update Order Summary', payload: orderSummary },)
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
    dispatch({ type: '[Cart] - Remove Product in cart', payload: product })
  }

  const updateAddress = (data:shippingAddress)=>{
    Cookie.set('firstName', data.firstName)
    Cookie.set('lastName', data.lastName)
    Cookie.set('address', data.address)
    Cookie.set('address2', data.address2 || '')
    Cookie.set('zip', data.zip)
    Cookie.set('city', data.city)
    Cookie.set('country', data.country)
    Cookie.set('phone', data.phone)

    
    dispatch({ type:'[Cart] - Update Address', payload: data })
  }

  const createOrder = async():Promise<{ hasError:boolean; message:string;}>=>{

    if ( !state.shippingAddress ) {
      throw new Error('No hay direccion de entrega')
    }

    const body :IOrder = {
      orderItems: state.cart.map( p =>({
        ...p,
        size:p.size!
      })),
      shippingAddress:state.shippingAddress,
      numberOfItems:state.numberOfItems,
      subTotal:state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid:false
    }

    try {
      const {data}= await tesloApi.post<IOrder>('/orders',body)

      dispatch({type:'[Cart] - Order Complete'})
      return{hasError:false,message:data._id!}
   
    } catch (error) {
      console.log(error)
      if ( axios.isAxiosError(error)) {
        return{
          hasError:true,
          message:error.response?.data.message
        }
      }
      return{
        hasError:true,
        message:'error no controlado'
      }
    }
  }

  return (
    <CartContext.Provider value={{
      ...state,
      //methods
      addProductToCart,
      updateCartQuantity,
      removeCartProduct,
      updateAddress,
      createOrder
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider