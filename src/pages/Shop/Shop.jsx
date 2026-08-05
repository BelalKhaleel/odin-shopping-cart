import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import styles from "./Shop.module.css";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAddToCartClick = (value, item) => {
    if (value === 0) return;
    if (cart.some(obj => obj.id === item.id)) {
      const newCart = cart.map(product => product.id === item.id ? { ...product, quantity: value } : product);
      setCart(newCart);
    } else {
      setCart([...cart, { ...item, quantity: value } ]);
    }
  }

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <h1>This is the shopping page!</h1>
      <div className={styles.cardsContainer}>
        {items &&
          items.map((item) => (
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
          ))}
      </div>
    </>
  );
};

export default Shop;
