import { useOutletContext } from "react-router";
import Card from "../../components/Card/Card";
import styles from './Cart.module.css';

const Cart = () => {
  const { cart, setCart, isShopping } = useOutletContext();
  
  return (
    <>
      <h1>This is the cart page!</h1>
      <div className={styles.cardsContainer}>
        {cart &&
          cart.map((item) => (
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
              quantity={item.quantity}
              cart={cart}
              updateCart={setCart}
              isShopping={isShopping}
            />
          ))}
      </div>
    </>
  );
};

export default Cart;
