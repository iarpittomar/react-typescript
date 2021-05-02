import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AppDispatchContext } from "../../contexts/AppContext/AppStateContext";
import CartCSS from "./Cart.module.css";

interface IProps {}

interface IState {
  isOpen: boolean;
}

class Cart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { isOpen: false };
  }

  handleClick = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    return (
      <AppDispatchContext.Consumer>
        {(state) => {
          const itemsCount = state.cart.items.reduce((sum, item) => {
            return sum + item.quantity;
          }, 0);

          return (
            <div className={CartCSS.cartContainer}>
              <button
                className={CartCSS.button}
                type="button"
                onClick={(e) =>
                  this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
                }
              >
                <FiShoppingCart /> <span>{itemsCount} Pizza(s)</span>
              </button>
              <div
                className={CartCSS.cartDropDown}
                style={{ display: this.state.isOpen ? "block" : "none" }}
              >
                <ul>
                  {state.cart.items.map((item) => {
                    return (
                      <li key={item.id}>
                        {item.name} &times; {item.quantity}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </AppDispatchContext.Consumer>
    );
  }
}

export default Cart;
