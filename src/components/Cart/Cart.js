import React from "react";
import Modal from "../UI/Modal";
import Classes from './Cart.module.css';

const Cart = props =>
{
    const cartItem = <ul className={Classes['cart-items']}> 
    {[{id: 'c1', name: 'sushi',amount:2,price:12.99},
].map((item) => <li>{item.name}</li>)}</ul>;
  return(
  <Modal onClose={props.onClose}>
      {cartItem}
      <div className={Classes.total}>
          <span>Total Amount</span>
          <span>35.62</span>
      </div>
      <div className={Classes.actions}>
          <button className={Classes['button--alt']} onClick={props.onClose}>Close</button>
          <button className={Classes.button}>Order</button>
      </div>
  </Modal>
  ); 
};

export default Cart;