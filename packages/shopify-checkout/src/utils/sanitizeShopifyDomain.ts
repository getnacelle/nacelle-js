/**
 * Sanitize `(brand).myshopify.com` domains.
 */
export default function sanitizeShopifyDomain(domain: string): string {
  const sanitizedDomain = domain
    ?.split('.myshopify')
    .shift()
    ?.split('//')
    .pop()
    ?.split('.')
    .pop();

  if (sanitizedDomain) {
    return sanitizedDomain;
  }

  return domain;
}
