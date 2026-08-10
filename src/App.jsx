import { useState } from "react";
import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isShopping, setIsShopping] = useState(false);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <main>
        <Outlet
          context={{
            cart,
            setCart,
            cartCount,
            setCartCount,
            isShopping,
            setIsShopping,
          }}
        />
      </main>
    </>
  );
}

export default App;
