import React from "react";
import { WithAddToCartProps } from "../../HOCs/withAddToCart";
import { IPizza } from "../../interface/IPizza";
import SpecialOfferCSS from "./SpecialOffer.module.css";

interface IProps {
  pizza: IPizza;
}

const SpecialOffer: React.FC<IProps> = ({ pizza }) => {
  return (
    <div className={SpecialOfferCSS.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <WithAddToCartProps>
        {({ addToCart }) => {
          return (
            <button type="button" onClick={() => addToCart({ ...pizza })}>
              Add to cart
            </button>
          );
        }}
      </WithAddToCartProps>
    </div>
  );
};
export default SpecialOffer;
