import React from "react";
import { Link } from "react-router-dom";

import "./CartItemCard.css";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="cardItemCard">
      <img src={item.image} alt="item" />
      <div>
        <Link to={`/products/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
