import { getSelectedVariant } from '../../src/utils/products';
import productData from 'mocks/product';

describe('getSelectedVariant util', () => {
  it('calls getSelectedVariant with product & options', () => {
    const selectedVariant = getSelectedVariant({
      product: productData,
      options: productData.variants[0].content.selectedOptions
    });
    expect(selectedVariant.content.title).toEqual(
      productData.variants[0].content.title
    );
  });

  it('calls getSelectedVariant with product & empty options', () => {
    const selectedVariant = getSelectedVariant({
      product: productData,
      options: []
    });
    expect(selectedVariant.content.title).toEqual(
      productData.variants[0].content.title
    );
  });

  it('calls getSelectedVariant without params', () => {
    const selectedVariant = getSelectedVariant({});
    expect(selectedVariant).toEqual(undefined);
  });
});
