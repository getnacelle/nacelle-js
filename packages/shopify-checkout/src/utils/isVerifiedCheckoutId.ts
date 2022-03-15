export default function isVerifiedCheckoutId(id: string): boolean {
  // Shopify CheckoutIds are Base64-encoded urls formatted like:
  // 'gid://shopify/Checkout/<id>' and therefore must include 'Z2lkOi8vc2hvcGlmeS9DaGVja291dC'
  if (!id?.length) {
    return false;
  }

  return id.includes('Z2lkOi8vc2hvcGlmeS9DaGVja291dC') && id !== '';
}
