import { createLocalVue, mount } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';
import nacelleSdk from '@nacelle/client-js-sdk';
import SpaceProvider from '~/providers/SpaceProvider';
import ProductProvider from '~/providers/ProductProvider';
import productData from 'mocks/product';

const localVue = createLocalVue();
localVue.use(CompositionApi);

jest.mock('@nacelle/client-js-sdk');

const InjectedComponent = {
  name: 'InjectedWithProduct',
  inject: [
    'product',
    'isFetching',
    'setProduct',
    'setSelectedOptions',
    'setSelectedVariant'
  ],
  template: `<div></div>`
};

const ProductProviderContainer = ({ props } = {}) => ({
  render: (h) =>
    h(SpaceProvider, {}, [
      h(ProductProvider, { props }, [h(InjectedComponent)])
    ])
});

describe('Product Provider', () => {
  it('provides `product`, `isFetching`, `setProduct  and `setSelectedVariant` to children', () => {
    const productProvider = mount(ProductProviderContainer(), { localVue });
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });

    expect(injectedProductComponent.vm.product.value).toBe(null);
    expect(injectedProductComponent.vm.isFetching.value).toBe(false);
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
      ProductProviderContainer({ props: { product: productData } }),
      { localVue }
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    );
  });

  it('initializes provider with productHandle prop', async () => {
    nacelleSdk.mockImplementation(() => ({
      data: { product: () => Promise.resolve(productData) }
    }));
    const productProvider = await mount(
      ProductProviderContainer({
        props: { productHandle: productData.handle }
      }),
      { localVue }
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    await new Promise((resolve) => setTimeout(() => resolve(true)));
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    );
  });

  it('it calls setProduct with a product object', () => {
    const productProvider = mount(ProductProviderContainer(), { localVue });
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setProduct');
    injectedProductComponent.vm.setProduct({ product: productData });
    expect(injectedProductComponent.vm.setProduct).toHaveBeenCalledTimes(1);
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    );
  });

  it('it calls setProduct with a product handle', async () => {
    nacelleSdk.mockImplementation(() => ({
      data: { product: () => Promise.resolve(productData) }
    }));
    const productProvider = mount(ProductProviderContainer(), { localVue });
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setProduct');
    await injectedProductComponent.vm.setProduct({
      handle: productData.handle
    });
    expect(injectedProductComponent.vm.setProduct).toHaveBeenCalledTimes(1);
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    );
  });

  it('it calls setSelectedOptions with options array', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } }),
      { localVue }
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setSelectedOptions');
    injectedProductComponent.vm.setSelectedOptions({
      options: productData.variants[0].selectedOptions
    });
    expect(
      injectedProductComponent.vm.setSelectedOptions
    ).toHaveBeenCalledTimes(1);
    expect(injectedProductComponent.vm.product.value.selectedOptions).toEqual(
      productData.variants[0].selectedOptions
    );
    expect(injectedProductComponent.vm.product.value.handle).toEqual(
      productData.handle
    );
  });

  it('it calls setSelectedVariant with variant object', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } }),
      { localVue }
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
      injectedProductComponent.vm.product.value.selectedVariant.handle
    ).toEqual(productData.variants[0].handle);
  });

  it('it calls setSelectedVariant with variant id', () => {
    const productProvider = mount(
      ProductProviderContainer({ props: { product: productData } }),
      { localVue }
    );
    const injectedProductComponent = productProvider.findComponent({
      name: 'InjectedWithProduct'
    });
    jest.spyOn(injectedProductComponent.vm, 'setSelectedVariant');
    injectedProductComponent.vm.setSelectedVariant({
      id: productData.variants[0].id
    });
    expect(
      injectedProductComponent.vm.setSelectedVariant
    ).toHaveBeenCalledTimes(1);
    expect(
      injectedProductComponent.vm.product.value.selectedVariant.handle
    ).toEqual(productData.variants[0].handle);
  });
});
