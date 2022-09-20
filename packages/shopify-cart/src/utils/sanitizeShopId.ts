/**
 * Sanitize `(brand).myshopify.com` domains.
 */
export default function sanitizeShopId(shopId: string): string {
  const sanitizedDomain = shopId
    .split('.myshopify')
    .shift()
    ?.split('//')
    .pop()
    ?.split('.')
    .pop();

  return sanitizedDomain || shopId;
}
