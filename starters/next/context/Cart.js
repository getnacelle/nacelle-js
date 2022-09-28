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

  const setCartIdWithCache = (cartId) => {
    setCartId(cartId);
    set(cacheKey, cartId);
  };

  const setOptimisticCart = ({ lines, checkoutUrl }) => {
    setLineItems(lines);
    if (checkoutUrl) {
      setCartCheckoutUrl(checkoutUrl);
    }
  };

  const setCart = ({ lines, checkoutUrl }) => {
    const lineItemsFromCart = [...lines];
    let linesArray = [];
    lineItems.forEach((lineItem) => {
      const index = lineItemsFromCart.findIndex((lineItemFromCart) => {
        if (
          lineItem.cartLineId &&
          !lineItem.cartLineId.includes('placeholder')
        ) {
          return lineItem.cartLineId === lineItemFromCart.id;
        } else {
          return (
            lineItem.variantId === lineItemFromCart.merchandise.sourceEntryId
          );
        }
      });
      if (index > -1) {
        linesArray.push(lineTransformer(lineItemsFromCart.splice(index, 1)[0]));
      }
    });
    linesArray = [
      ...linesArray,
      ...lineItemsFromCart.map((line) => lineTransformer(line))
    ];
    setLineItems(linesArray);
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

  const retrieveCart = async (cachedCartId) => {
    setIsLoading(true);
    setCartIdWithCache(cachedCartId);
    const { cart, userErrors, errors } = await cartClient.cart({
      cartId: cachedCartId
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
      setCartIdWithCache(cart.id);
    }
    setErrors({ userErrors, errors });
  };

  const initCart = async () => {
    const cachedCartId = await get(cacheKey);
    if (cachedCartId) {
      await retrieveCart(cachedCartId);
    } else {
      await createCart();
    }
  };

  const addItem = async (line) => {
    const index = lineItems.findIndex((lineItem) => {
      return line.cartLineId === lineItem.cartLineId;
    });
    if (index === -1) {
      const cartLineId = `placeholder-${uuid()}`;
      const items = [...lineItems, { ...line, cartLineId }];
      setOptimisticCart({ lines: items });
      const { cart, userErrors, errors } = await cartClient.cartLinesAdd({
        cartId: cartId,
        lines: [
          {
            nacelleEntryId: line.variant.nacelleEntryId,
            quantity: line.quantity || 1
          }
        ]
      });
      if (cart) {
        setCart({ lines: cart.lines, checkoutUrl: cart.checkoutUrl });
      }
      setErrors({ userErrors, errors });
    }
  };

  const updateItemQuantity = async (line) => {
    const { cart, userErrors, errors } = await cartClient.cartLinesUpdate({
      cartId: cartId,
      lines: [
        {
          id: line.cartLineId,
          nacelleEntryId: line.nacelleEntryId || null,
          quantity: line.quantity
        }
      ]
    });
    if (cart) {
      setCart({ lines: cart.lines, checkoutUrl: cart.checkoutUrl });
    }
    setErrors({ userErrors, errors });
  };

  const incrementItem = async (lineId) => {
    const index = lineItems.findIndex(
      (lineItem) => lineItem.cartLineId === lineId
    );
    if (index > -1) {
      const items = [...lineItems];
      items.splice(index, 1, {
        ...lineItems[index],
        quantity: lineItems[index].quantity + 1
      });
      setOptimisticCart({
        lines: items,
        cartCheckoutUrl
      });
      updateItemQuantity({
        cartLineId: items[index].cartLineId,
        quantity: items[index].quantity
      });
    }
  };

  const decrementItem = async (lineId) => {
    const index = lineItems.findIndex(
      (lineItem) => lineItem.cartLineId === lineId
    );
    if (index > -1) {
      if (lineItems[index].quantity === 1) {
        await removeItem(lineId);
      } else {
        const items = [...lineItems];
        items.splice(index, 1, {
          ...lineItems[index],
          quantity: lineItems[index].quantity - 1
        });
        setOptimisticCart({
          lines: items,
          cartCheckoutUrl
        });
        updateItemQuantity({
          cartLineId: items[index].cartLineId,
          quantity: items[index].quantity
        });
      }
    }
  };

  const removeItem = async (lineId) => {
    const index = lineItems.findIndex(
      (lineItem) => lineItem.cartLineId === lineId
    );
    const items = [...lineItems];
    if (index > -1) {
      items.splice(index, 1);
      setOptimisticCart({ lines: items });
      const { cart, userErrors, errors } = await cartClient.cartLinesRemove({
        cartId: cartId,
        lineIds: [lineId]
      });
      if (cart) {
        setCart({ lines: cart.lines, checkoutUrl: cart.checkoutUrl });
      }
      setErrors({ userErrors, errors });
    }
  };

  const clearCart = async () => {
    const items = [...lineItems];
    setOptimisticCart({ lines: [] });
    const { cart, userErrors, errors } = await cartClient.cartLinesRemove({
      cartId: cartId,
      lineIds: items.map((item) => item.cartLineId)
    });
    if (cart) {
      setCart({ lines: cart.lines, checkoutUrl: cart.checkoutUrl });
    }
    setErrors({ userErrors, errors });
  };

  const checkout = () => {
    if (cartCheckoutUrl) {
      setCheckoutProcessing(true);
      window.location.href = cartCheckoutUrl;
    } else {
      alert('There was an issue with your checkout.');
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
        cartSubtotal,
        cartErrors,
        isLoading,
        addItem,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        checkout,
        checkoutProcessing
      }}
    >
      {children}
    </CartContext.Provider>
  );
};