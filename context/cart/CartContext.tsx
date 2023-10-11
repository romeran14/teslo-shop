import { createContext } from 'react';
import { ICartProduct, shippingAddress } from '@/interfaces';


interface ContextProps {
    isLoaded:boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: shippingAddress


    //Method
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAddress: (address: shippingAddress) => void
    createOrder: () => Promise<{
        hasError: boolean;
        message: string;
    }>
}

export const CartContext = createContext({} as ContextProps)