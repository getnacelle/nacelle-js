import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { formatPrice } from 'utils/formatPrice';

const SearchAutocompleteItem = ({ item }) => {
  const price = formatPrice({ price: item.variants[0].price });
  const compareAtPrice = formatPrice({
    price: item.variants[0].compareAtPrice
  });

  return (
    item && (
      <Link
        className="py-6 flex hover:opacity-75 focus:opacity-75"
        to={`/products/${item.content.handle}`}
      >
        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
          <div className="relative w-full h-full">
            <GatsbyImage
              image={getImage(item.content.featuredMedia.remoteImage.childImageSharp)}
              alt={item.content.featuredMedia.altText}
              className="w-full h-full"
              fit="cover"
            />
          </div>
        </div>
        <div className="ml-4 flex-1 flex flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>{item.content.title}</h3>
              <p className="flex flex-wrap justify-end ml-4">
                {price && (
                  <span className={compareAtPrice ? 'text-red-600' : undefined}>
                    {price}
                  </span>
                )}
                {compareAtPrice && (
                  <span className="ml-2 line-through">{compareAtPrice}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Link>
    )
  );
};

export default SearchAutocompleteItem;
