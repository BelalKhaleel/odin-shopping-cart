import { useState } from "react";
import styles from "./Card.module.css";

const Card = ({
  imgUrl,
  altText,
  width = "100",
  height = "200",
  item,
  category,
  title,
  description,
  rating,
  price,
  quantity,
  // onChange,
  cart,
  editCart,
  isShopping,
  onAddToCartBtnClick,
}) => {
  const [value, setValue] = useState(0);

  const handleDecrementValueClick = (item) => {
    if (quantity) {
      const cartItem = cart.find((itemInCart) => itemInCart.id === item.id);
      const decrementedQuantity = cartItem.quantity - 1;
      if (decrementedQuantity === 0) {
        const newCart = cart.filter(item => item.id !== cartItem.id);
        editCart(newCart);
      } else {
        const newCart = cart.map((item) =>
          item.id === cartItem.id
            ? { ...cartItem, quantity: decrementedQuantity }
            : item,
        )
        editCart(newCart);
      }
    } else {
      if (value > 0) {
        const newValue = value - 1;
        setValue(newValue);
      }
    }
  };

  const handleIncrementValueClick = (item) => {
    if (cart.some((itemInCart) => itemInCart.id === item.id)) {
      const cartItem = cart.find((itemInCart) => itemInCart.id === item.id);
      const newCart = cart.map((item) =>
        item.id === cartItem.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : item,
      );
      editCart(newCart);
    } else {
      const newValue = value + 1;
      setValue(newValue);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCartBtnClick(value, item);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={imgUrl} alt={altText} width={width} height={height} />
      </div>
      <h2>{title}</h2>
      <span>Category: {category}</span>
      <p>{description}</p>
      <span>Rating: {rating}</span>
      <span>Price: {price}</span>
      <div className={styles.quantity}>
        <input
          type="number"
          min="0"
          placeholder="0"
          value={quantity ? quantity : value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button type="button" onClick={() => handleDecrementValueClick(item)}>
          -
        </button>
        <button type="button" onClick={() => handleIncrementValueClick(item)}>
          +
        </button>
      </div>
      {isShopping && (
        <button
          type="button"
          className={styles.addToCartBtn}
          onClick={handleAddToCartClick}
        >
          Add to cart
        </button>
      )}
    </div>
  );
};

export default Card;
