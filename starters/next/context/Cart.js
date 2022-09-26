import { createContext, useState, useMemo, useEffect } from 'react';
import { get, set } from 'idb-keyval';
import { v4 as uuid } from 'uuid';
import { cartClient } from 'services';

export const CartContext = createContext({});

export const CartProvider = ({ children, cacheKey = 'cartId' }) => {
  const [cartId, setCartId] = useState(null);
  const [cartCheckoutUrl, setCartCheckoutUrl] = useState(null);
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const [cartErrors, setCartErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const lineTransformer = (line) => {
    const { merchandise, cost } = line;
    return {
      availableForSale: merchandise.availableForSale,
      compareAtPrice: merchandise.compareAtPriceV2,
      featuredMedia: {
        altText: merchandise.image.altText,
        src: merchandise.image.url,
        thumbnailSrc: merchandise.image.url
      },
      cartLineId: line.id,
      nacelleEntryId: merchandise.nacelleEntryId,
      price: cost.amountPerQuantity.amount,
      productHandle: merchandise.product.handle,
      productTitle: merchandise.product.title,
      quantity: line.quantity,
      selectedOptions: merchandise.selectedOptions,
      variantId: merchandise.sourceEntryId,
      variantTitle: merchandise.title,
      metafields: line.attributes
    };
  };

  const cartCount = useMemo(
    () => lineItems.reduce((acc, item) => acc + item.quantity, 0),
    [lineItems]
  );

  const cartSubtotal = useMemo(
    () => lineItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [lineItems]
  );

  const setOptimisticCart = ({ lines, checkoutUrl }) => {
    setLineItems(lines);
    if (checkoutUrl) {
      setCartCheckoutUrl(checkoutUrl);
    }
  };

  const setErrors = ({ errors, userErrors }) => {
    setCartErrors([]);
    const errorsArray = [];
    if (errors) {
      errors.forEach((error) => errorsArray.push(error.message));
    }
    if (userErrors) {
      userErrors.forEach((error) => errorsArray.push(error.message));
    }
    setCartErrors(errorsArray);
  };

  const retrieveCart = async (cartId) => {
    setIsLoading(true);
    setCartId(cartId);
    const { cart, userErrors, errors } = await cartClient.cart({
      cartId
    });
    if (cart) {
      setOptimisticCart({
        lines: cart.lines.map((line) => lineTransformer(line)),
        checkoutUrl: cart.checkoutUrl
      });
    }
    setCartErrors({ userErrors, errors });
    setIsLoading(false);
  };

  const createCart = async () => {
    const { cart, userErrors, errors } = await cartClient.cartCreate();
    if (cart) {
      setCartId(cart.id);
    }
    setErrors({ userErrors, errors });
  };

  const initCart = async () => {
    const cachedCartId = await get(state.cacheKey);
    if (cachedCartId) {
      await createCart();
    } else {
      await retrieveCart();
    }
  };

  useEffect(() => {
    initCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems: lineItems,
        cartCount,
        cartSubtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
