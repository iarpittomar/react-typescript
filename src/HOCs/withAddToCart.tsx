import React from "react";
import {
  useStateDispatch,
  IItem,
} from "../contexts/AppContext/AppStateContext";

export interface IAddToCart {
  addToCart: (item: Omit<IItem, "quantity">) => void;
}

export const withAddToCart = <OriginalProps extends IAddToCart>(
  ChildComponent: React.ComponentType<OriginalProps>
) => {
  const AddToCartHOC = (props: Omit<OriginalProps, keyof IAddToCart>) => {
    const dispatch = useStateDispatch();
    const handleAddToCart: IAddToCart["addToCart"] = (item) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          item,
        },
      });
    };
    return (
      <ChildComponent
        {...(props as OriginalProps)}
        addToCart={handleAddToCart}
      />
    );
  };

  return AddToCartHOC;
};

//Render props component
export const WithAddToCartProps: React.FC<{
  children: (props: IAddToCart) => JSX.Element;
}> = ({ children }) => {
  const dispatch = useStateDispatch();
  const addToCart: IAddToCart["addToCart"] = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item,
      },
    });
  };
  return children({ addToCart });
};
