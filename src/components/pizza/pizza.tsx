import React from "react";
import { IAddToCart, withAddToCart } from "../../HOCs/withAddToCart";
import { IPizza } from "../../interface/IPizza";
import PizzaCSS from "./Pizza.module.css";

interface IProps extends IAddToCart {
  pizza: IPizza;
}

const Pizza: React.FC<IProps> = ({ pizza, addToCart }) => {
  const handleClick = () => {
    addToCart({ ...pizza });
  };

  return (
    <li className={PizzaCSS.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button type="button" onClick={handleClick}>
        Add to cart
      </button>
    </li>
  );
};

export default withAddToCart(Pizza);
