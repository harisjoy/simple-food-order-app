import React from "react";
import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    item: [],
    totalAmount: 0
};

const cartReducer = (state,action) => {
    if (action.type === 'ADD') {

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.item.findIndex((item) => item.id === action.item.id);

        const existingCartItem = state.item[existingCartItemIndex];
        let updatedItem;
        let updatedItems;

        if (existingCartItem) {
        const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.item];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.item.concat(action.item);
        }
        return {
            items: updatedItem,
            totalAmount: updatedTotalAmount
        };
    };
    if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.item.findIndex(
            (item) => item.id === action.item.id
        );
        const existingItem = state.item[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
    }
   return defaultCartState;
};
const CartProvider = props => {
   const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item:item});
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id:id})
    };

    const cartContext = {
        item: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    };
    
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )};
export default CartProvider;