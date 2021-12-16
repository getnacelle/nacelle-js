import productsArray from 'mocks/products';
import { filterProducts, sortProducts } from '../../src/utils/refinement';

const productsByDescendingPrice = [
  productsArray[0],
  productsArray[2],
  productsArray[1]
];

describe('filterProducts', () => {
  it('Filters by property', () => {
    expect(
      filterProducts({
        inputData: productsArray,
        activeFilters: [{ property: 'color', values: ['blue'] }]
      })
    ).toStrictEqual([productsArray[0], productsArray[1]]);

    expect(
      filterProducts({
        inputData: productsArray,
        activeFilters: [{ property: 'color', values: ['green'] }]
      })
    ).toStrictEqual([productsArray[2]]);

    expect(
      filterProducts({
        inputData: productsArray,
        activeFilters: [
          { property: 'color', values: ['blue'] },
          { property: 'size', values: ['large'] }
        ]
      })
    ).toStrictEqual([productsArray[0]]);
  });
});

describe('sortProducts', () => {
  it("Doesn't filter by price if no `activePriceRange` is given", () => {
    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: null,
        sortBy: 'price-desc'
      })
    ).toStrictEqual(productsByDescendingPrice);
  });

  it('Short-circuits if an upsupported `sortBy` is given', () => {
    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: null,
        sortBy: 'flavor-asc'
      })
    ).toStrictEqual(productsArray);
  });

  it('Sorts all products by price', () => {
    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: { label: '< $100', range: [0, 100] },
        sortBy: 'price-desc'
      })
    ).toStrictEqual(productsByDescendingPrice);

    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: { label: '< $100', range: [0, 100] },
        sortBy: 'price-asc'
      })
    ).toStrictEqual([...productsByDescendingPrice].reverse());
  });

  it('Sorts products within a price threshold, by price', () => {
    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: { label: '< $100', range: [5, 100] },
        sortBy: 'price-desc'
      })
    ).toStrictEqual(productsByDescendingPrice);

    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: { label: '< $100', range: [5, 0] },
        sortBy: 'price-desc'
      })
    ).toStrictEqual(productsByDescendingPrice);

    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: { label: '< $50', range: [0, 5] },
        sortBy: 'price-desc'
      })
    ).toStrictEqual([]);

    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: { label: '< $50', range: [0, 50] },
        sortBy: 'price-desc'
      })
    ).toStrictEqual([productsArray[2], productsArray[1]]);

    expect(
      sortProducts({
        inputData: productsArray,
        activePriceRange: { label: '< $50', range: [0, 50] },
        sortBy: 'price-asc'
      })
    ).toStrictEqual([productsArray[1], productsArray[2]]);
  });
});
