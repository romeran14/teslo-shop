import { ICartProduct } from '@/interfaces'
import { CartState } from './'

type cartActionType =
   | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
   | { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
   | { type: '[Cart] - Change Product quantity', payload: ICartProduct }
   | { type: '[Cart] - Remove Product in cart', payload: ICartProduct }
   | { type: '[Cart] - Update Order Summary', 
   payload: {
      numberOfItems:number;
      subTotal:number;
      tax:number;
      total:number;
   } }

export const cartReducer = (state: CartState, action: cartActionType): CartState => {
   switch (action.type) {
      case '[Cart] - LoadCart from cookies | storage':
         return {
            ...state,
            cart: [...action.payload]
         }
      case '[Cart] - Update products in cart':
         return {
            ...state,
            cart: [...action.payload]
         }
      case '[Cart] - Change Product quantity':
         return {
            ...state,
            cart: state.cart.map(product => {
               if (product._id !== action.payload._id) return product;
               if (product.size !== action.payload.size) return product;

               return action.payload
            })
         }
      case '[Cart] - Remove Product in cart':
         return {
            ...state,
            cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size) )
         }
         case '[Cart] - Update Order Summary':
            return {
               ...state,
               ...action.payload
            }
      default:
         return state
   }
}