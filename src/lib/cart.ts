import { CartItem } from "@/redux/features/cart/cartSlice";

export const deliveryFee = 5;

export const getCartQuantity = (cart: CartItem[]) => {
    return cart.reduce((quantity, item) => item.quantity! + quantity, 0)
}

export const getItemQuantity = (id: string, cart: CartItem[]) => {
    return cart.find(item => item.id === id)?.quantity || 0;
}

export const getSubTotal = (cart: CartItem[]) => {
    return cart.reduce((total, item) => {
        const extras = item.extras ? item.extras.reduce((extraTotal, extra) => extraTotal + extra.price, 0) : 0;
        const sizes = item.size ? item.size.price : 0;
        return total + (item.basePrice + extras + sizes) * item.quantity!
    }, 0);
}

export const getTotalAmount = (cart: CartItem[]) => {
    return getSubTotal(cart) + deliveryFee;
}