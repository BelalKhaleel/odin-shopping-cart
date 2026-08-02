import styles from "./Card.module.css";

const Card = ({
  imgUrl,
  altText,
  width = "100",
  height = "200",
  category,
  title,
  description,
  rating,
  price,
}) => {
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
    </div>
  );
};

export default Card;
