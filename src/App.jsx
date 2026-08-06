import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";

function App() {
  const [cartCount, setCartCount] = useState(0);
  
  return (
    <>
      <Navbar cartCount={cartCount}/>
      <main>
        <Outlet context={[cartCount, setCartCount]} />
      </main>
    </>
  );
}

export default App;
