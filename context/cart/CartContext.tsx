import { createContext } from 'react';
import { ICartProduct } from '@/interfaces';
import { shippingAddress } from '.';

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
}

export const CartContext = createContext({} as ContextProps)