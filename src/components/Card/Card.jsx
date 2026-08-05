import styles from "./Card.module.css";
import { useState } from "react";

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
  onChange,
  onAddToCartBtnClick,
}) => {

  const [value, setValue] = useState(0);

  const handleDecrementValueClick = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
    }
  }
  
  const handleIncrementValueClick = () => {
    const newValue = value + 1;
    setValue(newValue);
  }

  const handleAddToCartClick = () => {
    onAddToCartBtnClick(value, item);
  }
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
          value={value}
          onChange={onChange}
        ></input>
        <button type="button" onClick={handleDecrementValueClick}>
          -
        </button>
        <button type="button" onClick={handleIncrementValueClick}>
          +
        </button>
      </div>
      <button
        type="button"
        className={styles.addToCartBtn}
        onClick={handleAddToCartClick}
      >
        Add to cart
      </button>
    </div>
  );
};

export default Card;
