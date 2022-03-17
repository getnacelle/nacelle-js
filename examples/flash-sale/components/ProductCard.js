import Image from 'next/image';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const selectedVariant = product.variants[0];

  return (
    product && (
      <div className={styles.card}>
        {product.content.featuredMedia ? (
          <Image
            src={product.content.featuredMedia.src}
            alt={product.content.featuredMedia.altText}
            width={530}
            height={350}
            className={styles.image}
          />
        ) : (
          <div>No Image</div>
        )}
        <div className={styles.main}>
          {product.content.title && (
            <h2 className={styles.title}>{product.content.title}</h2>
          )}
          <div className={styles.prices}>
            {selectedVariant.compareAtPrice && (
              <div className={styles.compare}>
                ${selectedVariant.compareAtPrice}
              </div>
            )}
            <div className={styles.price}>${selectedVariant.price}</div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductCard;
