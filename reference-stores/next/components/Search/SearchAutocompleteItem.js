import Link from 'next/link'
import Image from 'next/image'
import {formatPrice } from 'utils/formatPrice'

const SearchAutocompleteItem = ({ item }) => {
  const price = formatPrice({ price: item.variants[0].price })
  const compareAtPrice = formatPrice({ price: item.variants[0].compareAtPrice })

  return item && (
    <Link href={`/products/${item.content.handle}`}>
      <div className="py-6 flex">
        <div
          className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
        >
          <div className="relative w-full h-full">
            <Image
              src={item.content.featuredMedia.src}
              alt={item.content.featuredMedia.altText}
              quality={80}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="ml-4 flex-1 flex flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                {item.content.title}
              </h3>
              <p className="ml-4">
                {price && (
                  <span className={compareAtPrice ? 'text-red-600' : undefined}>
                    {price}
                  </span>
                )}
                {compareAtPrice && (
                  <span class="ml-2 line-through">
                    {compareAtPrice}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SearchAutocompleteItem