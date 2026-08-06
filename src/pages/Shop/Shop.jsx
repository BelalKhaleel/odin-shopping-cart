import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import Card from "../../components/Card/Card";
import styles from "./Shop.module.css";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart, cartCount, setCartCount, setIsShopping } =
    useOutletContext();

  setIsShopping(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) throw new Error("Server Error");
        return response.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCartClick = (quantity, item) => {
    if (quantity <= 0) return;
    if (cart.some((product) => product.id === item.id)) {
      const newCart = cart.map((product) =>
        product.id === item.id ? { ...product, quantity: quantity } : product,
      );
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: quantity }]);
    }
  };

  const itemsInCart = cart.length;
  setCartCount(itemsInCart);
  console.table(cart);
  console.log(cartCount);

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <h1>This is the shopping page!</h1>
      <div className={styles.cardsContainer}>
        {items &&
          items.map((item) => {
            if (cart.some((itemInCart) => itemInCart.id === item.id)) {
              const cartItem = cart.find(
                (itemInCart) => itemInCart.id === item.id,
              );
              return (
                <Card
                  key={cartItem.id}
                  imgUrl={cartItem.image}
                  altText={cartItem.title}
                  item={cartItem}
                  category={cartItem.category}
                  title={cartItem.title}
                  // description={cartItem.description}
                  rating={cartItem.rating.rate}
                  price={cartItem.price}
                  quantity={cartItem.quantity}
                  onAddToCartBtnClick={handleAddToCartClick}
                />
              );
            } else {
              return (
                <Card
                  key={item.id}
                  imgUrl={item.image}
                  altText={item.title}
                  item={item}
                  category={item.category}
                  title={item.title}
                  // description={item.description}
                  rating={item.rating.rate}
                  price={item.price}
                  onAddToCartBtnClick={handleAddToCartClick}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default Shop;
