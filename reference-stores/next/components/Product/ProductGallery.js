import Image from 'next/image';
import { useState } from 'react'
import { useProduct } from 'hooks/useProduct'

const ProductGallery = () => {
  const { product } = useProduct()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const images = product?.content?.media?.filter(
    (media) => media.type === 'IMAGE'
  );

  const handleImageClick = (index)  => {
    setActiveImageIndex(index)
  }

  return images.length && (
    <div className="flex flex-col-reverse">
      <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
        <div
          className="grid grid-cols-4 gap-6"
          aria-orientation="horizontal"
          role="tablist"
        >
          {images.map((image, index) => (
            <button 
              id={`tabs-1-tab-${index}`}
              key={image.src}
              className="
                relative
                h-24
                bg-white
                rounded-md
                flex
                items-center
                justify-center
                text-sm
                font-medium
                uppercase
                text-gray-900
                cursor-pointer
                hover:bg-gray-50
                focus:outline-none
                focus:ring
                focus:ring-offset-4
                focus:ring-opacity-50
              "
              aria-controls={`tabs-1-panel-${index}`}
              role="tab"
              type="button"
              onClick={() => handleImageClick(index)}
            >
              <span className="sr-only">
                {image.altText}
              </span>
              <span className="absolute inset-0 rounded-md overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.altText}
                  className="thumbnail"
                  quality={80}
                  layout="fill"
                  objectFit="cover"
                />
              </span>
              <span
              className={`${
                activeImageIndex === index
                  ? 'ring-indigo-500'
                  : 'ring-transparent'
              } absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none`}
              aria-hidden="true"
            ></span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full aspect-w-1 aspect-h-1">
        {images.map((image, index) => (
          <div
            id={`tabs-1-panel-${index}`}
            key={image.src}
            aria-labelledby={`tabs-1-panel-${index}`}
            role="tabpanel"
            tabIndex="0"
            className={index !== activeImageIndex ? 'hidden' : ''}
          >
            <Image
              src={image.src}
              alt={image.altText}
              className="picture sm:rounded-lg"
              quality={80}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductGallery