import { mount } from '@vue/test-utils';
import ProductProvider from '~/providers/ProductProvider';
import productData from 'mocks/product';

const InjectedComponent = {
  name: 'InjectedWithProduct',
  inject: ['product', 'setProduct', 'setSelectedOptions', 'setSelectedVariant'],
  render: (h) => h('div')
};

const ProductProviderContainer = ({ props } = {}) => ({
  render: (h) => h(ProductProvider, { props }, [h(InjectedComponent)])
});

describe('Product Provider', () => {
  it('provides `product`, `setProduct  and `setSelectedVariant` to children', () => {
    const productProvider = mount(ProductProviderContainer());
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });

    expect(injectedProductComponent.vm.product.value).toBe(null);
    expect(typeof injectedProductComponent.vm.setProduct).toEqual('function');
    expect(typeof injectedProductComponent.vm.setSelectedOptions).toEqual(
      'function'
    );
    expect(typeof injectedProductComponent.vm.setSelectedVariant).toEqual(
      'function'
    );
  });

  it('initializes provider with product prop', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } })
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    expect(injectedProductComponent.vm.product.value.content.handle).toEqual(
      productData.content.handle
    );
  });

  it('it calls setProduct with a product object', () => {
    const productProvider = mount(ProductProviderContainer());
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setProduct');
    injectedProductComponent.vm.setProduct({ product: productData });
    expect(injectedProductComponent.vm.setProduct).toHaveBeenCalledTimes(1);
    expect(injectedProductComponent.vm.product.value.content.handle).toEqual(
      productData.content.handle
    );
  });

  it('it calls setProduct without product params', () => {
    const productProvider = mount(ProductProviderContainer());
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setProduct');
    console.warn = jest.fn();
    injectedProductComponent.vm.setProduct({});
    expect(injectedProductComponent.vm.setProduct).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      "[nacelle] ProductProvider's `setProduct` method requires a `product` parameter."
    );
  });

  it('it calls setSelectedOptions with options array', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } })
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setSelectedOptions');
    injectedProductComponent.vm.setSelectedOptions({
      options: productData.variants[0].content.selectedOptions
    });
    expect(
      injectedProductComponent.vm.setSelectedOptions
    ).toHaveBeenCalledTimes(1);
    expect(injectedProductComponent.vm.product.value.selectedOptions).toEqual(
      productData.variants[0].content.selectedOptions
    );
  });

  it('it calls setSelectedOptions without params', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } })
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setSelectedOptions');
    injectedProductComponent.vm.setSelectedOptions({});
    expect(
      injectedProductComponent.vm.setSelectedOptions
    ).toHaveBeenCalledTimes(1);
    expect(injectedProductComponent.vm.product.value.selectedOptions).toEqual(
      null
    );
  });

  it('it calls setSelectedVariant with a variant object', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } })
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setSelectedVariant');
    injectedProductComponent.vm.setSelectedVariant({
      variant: productData.variants[0]
    });
    expect(
      injectedProductComponent.vm.setSelectedVariant
    ).toHaveBeenCalledTimes(1);
    expect(
      injectedProductComponent.vm.product.value.selectedVariant.productHandle
    ).toEqual(productData.variants[0].productHandle);
  });

  it('it calls setSelectedVariant with a variant sourceEntryId', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } })
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setSelectedVariant');
    injectedProductComponent.vm.setSelectedVariant({
      sourceEntryId: productData.variants[0].sourceEntryId
    });
    expect(
      injectedProductComponent.vm.setSelectedVariant
    ).toHaveBeenCalledTimes(1);
    expect(
      injectedProductComponent.vm.product.value.selectedVariant.productHandle
    ).toEqual(productData.variants[0].productHandle);
  });

  it('it calls setSelectedVariant without params', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } })
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setSelectedVariant');
    injectedProductComponent.vm.setSelectedVariant({ variant: null });
    expect(
      injectedProductComponent.vm.setSelectedVariant
    ).toHaveBeenCalledTimes(1);
    expect(injectedProductComponent.vm.product.value.selectedVariant).toEqual(
      null
    );
  });
});
