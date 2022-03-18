import { nacelleClient } from 'services';
import { PRODUCT_ROUTES_QUERY, PRODUCT_PAGE_QUERY } from 'queries/productPage'
import { ProductProvider } from 'context/Product'
import ProductDetails from 'components/Product/ProductDetails'

const ProductHandle = ({ product, page }) => {

  const fields = page?.fields || {};
  const { sections, ...rest } = fields
  const content = { fields: rest }

  return (
    <div class="bg-white">
      <ProductProvider product={product}>
        <ProductDetails content={content} />
      </ProductProvider>
    </div>
  )
}

export async function getStaticPaths() {
  const { products } = await nacelleClient.query({
    query: PRODUCT_ROUTES_QUERY
  });

  const paths = products
    .filter((product) => product.content?.handle)
    .map((product) => ({ params: { handle: product.content.handle } }));

  return {
    paths,
    fallback: 'blocking'
  };

}

export async function getStaticProps({ params: { handle } }) {
  const { products, pages } = await nacelleClient.query({
    query: PRODUCT_PAGE_QUERY,
    variables: { handle }
  });
  return {
    props: {
      product: products[0] || null,
      page: pages[0] || null
    }
  };
}

export default ProductHandle