import ProductGallery from './ProductGallery'

const ProductDetails = ({ product, content }) => {

  return (
    <div className="bg-white">
      <div
        className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <ProductGallery product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails