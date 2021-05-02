import React from "react";

export interface IItem {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

interface IAppStateValue {
  cart: {
    items: IItem[];
  };
}

interface IAction<T> {
  type: T;
}

interface IAddToCartAction extends IAction<"ADD_TO_CART"> {
  payload: {
    item: Omit<IItem, "quantity">;
  };
}

interface IInitializeCartAction extends IAction<"INITIALIZE_CART"> {
  payload: {
    cart: IAppStateValue["cart"];
  };
}

const reducer = (
  state: IAppStateValue,
  action: IAddToCartAction | IInitializeCartAction
) => {
  if (action.type === "ADD_TO_CART") {
    const itemToAdd = action.payload.item;
    const itemExist = state.cart.items.find((item) => item.id === itemToAdd.id);
    return {
      ...state,
      cart: {
        ...state.cart,
        items: itemExist
          ? state.cart.items.map((item) => {
              if (item.id === itemToAdd.id) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          : [...state.cart.items, { ...itemToAdd, quantity: 1 }],
      },
    };
  } else if (action.type === "INITIALIZE_CART") {
    return { ...state, cart: action.payload.cart };
  }
  return state;
};

const defaultStateValue: IAppStateValue = {
  cart: {
    items: [],
  },
};

export const AppDispatchContext = React.createContext(defaultStateValue);
export const AppSetDispatchContext = React.createContext<
  React.Dispatch<IAddToCartAction> | undefined
>(undefined);

export const useStateDispatch = () => {
  const dispatch = React.useContext(AppSetDispatchContext);
  if (!dispatch) {
    throw new Error(
      "useStateDispatch was called outside of AppSetStateContext provider"
    );
  }
  return dispatch;
};

const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, defaultStateValue);

  React.useEffect(() => {
    const cart = window.localStorage.getItem("cart");
    if (cart) {
      dispatch({
        type: "INITIALIZE_CART",
        payload: { cart: JSON.parse(cart) },
      });
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppDispatchContext.Provider value={state}>
      <AppSetDispatchContext.Provider value={dispatch}>
        {children}
      </AppSetDispatchContext.Provider>
    </AppDispatchContext.Provider>
  );
};

export default AppStateProvider;
