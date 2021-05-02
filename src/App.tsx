import React from "react";
import pizzas from "../src/data/pizza.json";
import Pizza from "./components/pizza/pizza";
import AppCSS from "./App.module.css";
import { ReactComponent as PizzaSVG } from "./pizza.svg";
import Cart from "./components/Cart/cart";
import AppStateProvider from "./contexts/AppContext/AppStateContext";
import SpecialOffer from "./components/SpecialOffer/SpecialOffer";

const App = () => {
  const specialOfferPizza = pizzas.find((pizza) => pizza.specialOffer);
  return (
    <AppStateProvider>
      <div className={AppCSS.container}>
        <div className={AppCSS.header}>
          <PizzaSVG width="120px" height="120px" />
          <div className={AppCSS.siteTitle}>Delicious Pizza</div>
          <Cart />
        </div>
        {specialOfferPizza && <SpecialOffer pizza={specialOfferPizza} />}
        <ul className={AppCSS.pizzaList}>
          {pizzas.map((pizza) => (
            <Pizza key={pizza.id} pizza={pizza} />
          ))}
        </ul>
      </div>
    </AppStateProvider>
  );
};

export default App;
