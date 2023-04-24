import { nacelleClient } from 'services';
import { PRODUCT_ROUTES_QUERY, PRODUCT_PAGE_QUERY } from 'queries/productPage';
import { resolvePageData } from 'utils/resolvers';
import { ProductProvider } from 'context/Product';
import ProductDetails from 'components/Product/ProductDetails';
import Section from 'components/Section/Section';

const ProductHandle = ({ product, page }) => {
  const fields = page?.fields || {};
  const { sections, ...rest } = fields;
  const content = { fields: rest };

  return (
    product && (
      <div className="bg-white">
        <ProductProvider product={product}>
          <ProductDetails content={content} />
        </ProductProvider>
        {sections?.map((section, index) => (
          <Section key={index} content={section} />
        ))}
      </div>
    )
  );
};

export async function getStaticPaths() {
  let { data } = await nacelleClient.query({
    query: PRODUCT_ROUTES_QUERY
  });
  const paths = data.products.edges
    .filter((product) => product.node.content?.handle)
    .map((product) => ({ params: { handle: product.node.content?.handle } }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params: { handle } }) {
  const { data } = await nacelleClient.query({
    query: PRODUCT_PAGE_QUERY,
    variables: {
      handle: handle,
      pageHandle: `page-${handle}`
    }
  });
  const { page } = await resolvePageData({
    client: nacelleClient,
    page: data.pages.edges[0]?.node
  });
  return {
    props: {
      product: data.products.edges[0].node || null,
      page: page || null
    }
  };
}

export default ProductHandle;
