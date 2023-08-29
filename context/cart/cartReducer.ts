import { ICartProduct } from '@/interfaces'
import { CartState } from './'

type cartActionType =
   | { type: '[Cart] - LoadCart from cookies | storage', payload:ICartProduct[] }
   | { type: '[Cart] - AddProduct', payload:ICartProduct }

export const cartReducer = (state: CartState, action: cartActionType): CartState => {
  switch (action.type) {
   case '[Cart] - LoadCart from cookies | storage':
   return {
    ...state,
    }

    default:
    return state
 }
}