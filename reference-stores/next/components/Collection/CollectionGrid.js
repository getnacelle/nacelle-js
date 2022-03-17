import { useState } from 'react'
import { nacelleClient } from 'services';
import { COLLECTION_PRODUCTS_QUERY } from 'queries/collection'
import { ProductProvider } from 'context/Product'
import ProductCard from 'components/Product/ProductCard'

const CollectionGrid = ({ collection }) => {
  const [products, setProducts] = useState(collection?.products || [])
  const [canFetch, setCanFetch] = useState(products.length > 12)
  const [activeProducts, setActiveProducts] = useState(canFetch 
    ? products?.slice(0, products.length - 1)
    : products
  )
  const [isFetching, setIsFetching] = useState(false)

  const handleFetch = async() => {
    setIsFetching(true)
    const after = products[products?.length - 1].nacelleEntryId;
    const { collections } = await nacelleClient.query({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle: collection.content?.handle, after }
    });
    const collectionProducts = collections[0]?.products;
    if (collectionProducts) {
      const allProducts = [...products, ...collectionProducts]
      setCanFetch(collectionProducts.length === 12)
      setProducts(allProducts)
      setActiveProducts(canFetch 
        ? allProducts?.slice(0, allProducts.length - 1)
        : allProducts
      )
    }
    setIsFetching(false)
  }

  return collection && (
    <div className="bg-white">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200 pb-10 flex">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 flex-1">
          {collection.content.title}
        </h1>
        </div>
        {activeProducts.length && (
          <div className="pt-12 text-center">
            <div
              className="
                grid grid-cols-2
                gap-x-4 gap-y-8
                sm:grid-cols-3 sm:gap-x-6
                lg:grid-cols-4
                xl:gap-x-8
                text-left
              "
            >
              {activeProducts.map(product => (
                <ProductProvider product={product} key={product.nacelleEntryId}>
                  <ProductCard />
                </ProductProvider>
              ))}
            </div>
            {canFetch && (
              <button
                type="button"
                disabled={isFetching}
                className="
                  inline-flex
                  px-4
                  py-2
                  mt-8
                  border border-transparent
                  text-base
                  font-medium
                  rounded-md
                  shadow-sm
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700 hover:cursor-pointer
                "
                onClick={handleFetch}
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectionGrid