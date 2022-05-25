export const formatPrice = ({ price, locale, currencyCode }) => {
  return (
    price &&
    Intl.NumberFormat(locale || 'en-US', {
      style: 'currency',
      currency: currencyCode || 'USD'
    }).format(price)
  );
};
