import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";

function App() {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isShopping, setIsShopping] = useState(false);
  
  return (
    <>
      <Navbar cartCount={cartCount}/>
      <main>
        <Outlet context={{cart, setCart, cartCount, setCartCount, isShopping, setIsShopping}} />
      </main>
    </>
  );
}

export default App;
