export default function isVerifiedCheckoutId(id: string): boolean {
  // Shopify CheckoutIds are either plaintext or Base64-encoded urls formatted like:
  // 'gid://shopify/Checkout/<id>'. If they are Base64 encoded, they must include
  // 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC', which is Base64-encoded 'gid://shopify/Checkout'.
  if (!id?.length) {
    return false;
  }

  return (
    id.includes('Z2lkOi8vc2hvcGlmeS9DaGVja291dC') ||
    id.includes('gid://shopify/Checkout')
  );
}
