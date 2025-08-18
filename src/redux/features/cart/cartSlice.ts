"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, Size } from '../../../../generated/prisma';
import { RootState } from '@/redux/store';

export interface CartItem {
    id: string;
    name: string;
    image: string;
    basePrice: number;
    quantity?: number;
    size?: Size;
    extras?: Extra[];
}

type CartState = {
    items: CartItem[];
};

const initialCartItemsInLocalStorage = typeof localStorage !== "undefined" && localStorage.getItem("cartItems");

const initialState: CartState = {
    items: initialCartItemsInLocalStorage ? JSON.parse(initialCartItemsInLocalStorage) : [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddCartItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + 1;
                existingItem.size = action.payload.size;
                existingItem.extras = action.payload.extras;
                localStorage.setItem('cartItems', JSON.stringify(action.payload));
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
                localStorage.setItem('cartItems', JSON.stringify(action.payload));
            }
        },
        // Remove One Item From Cart
        removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
            const currentItem = state.items.find(item => item.id === action.payload.id);
            if (currentItem) {
                if (currentItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== action.payload.id);
                } else {
                    currentItem.quantity! -= 1
                }
            }
        },
        // Remove Items From Cart
        removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        // Clear Cart
        clearCart: (state) => {
            state.items = [];
        },
    },
})

export const { AddCartItem, removeCartItem, removeItemFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer

// Custom Selectors For Cart Items
export const selectorCartItems = (state: RootState) => state.cart.items;