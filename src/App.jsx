import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const isShopping = location.pathname === "/shop";
  const cartCount = cart.length;

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main>
        <Outlet
          context={{
            cart,
            setCart,
            cartCount,
            isShopping,
          }}
        />
      </main>
    </>
  );
}

export default App;
