import { mount } from '@vue/test-utils';
import nacelleSdk from '@nacelle/client-js-sdk';
import SpaceProvider from '~/providers/SpaceProvider';
import CollectionProvider from '~/providers/CollectionProvider';
import collectionData from 'mocks/collection';

jest.mock('@nacelle/client-js-sdk');

const InjectedComponent = () => {
  return {
    name: 'InjectedWithCollection',
    inject: ['collection', 'isFetching', 'setCollection', 'loadProducts'],
    template: `<div></div>`
  };
};

const CollectionProviderContainer = ({ props } = {}) => ({
  render: (h) =>
    h(SpaceProvider, {}, [
      h(CollectionProvider, { props }, [h(InjectedComponent())])
    ])
});

describe('Collection Provider', () => {
  it('provides `collection`, `isFetching`, `setCollection`  and `loadProducts` to children', () => {
    const collectionProvider = mount(CollectionProviderContainer());
    const injectedCollectionComponent = collectionProvider.findComponent({
      name: 'InjectedWithCollection'
    });

    expect(injectedCollectionComponent.vm.collection.value).toBe(null);
    expect(injectedCollectionComponent.vm.isFetching.value).toBe(false);
    expect(typeof injectedCollectionComponent.vm.setCollection).toEqual(
      'function'
    );
    expect(typeof injectedCollectionComponent.vm.loadProducts).toEqual(
      'function'
    );
  });

  it('initializes provider with collection prop', () => {
    const collectionProvider = mount(
      CollectionProviderContainer({ props: { collection: collectionData } })
    );
    const injectedCollectionComponent = collectionProvider.findComponent({
      name: 'InjectedWithCollection'
    });
    expect(injectedCollectionComponent.vm.collection.value.handle).toEqual(
      collectionData.handle
    );
  });

  it('initializes provider with collectionHandle prop', async () => {
    nacelleSdk.mockImplementation(() => ({
      data: {
        collection: () => Promise.resolve({ ...collectionData, products: [] }),
        collectionPage: () => Promise.resolve(collectionData.products)
      }
    }));
    const collectionProvider = await mount(
      CollectionProviderContainer({
        props: { collectionHandle: collectionData.handle }
      })
    );
    const injectedCollectionComponent = collectionProvider.findComponent({
      name: 'InjectedWithCollection'
    });
    await new Promise((resolve) => setTimeout(() => resolve(true)));
    expect(injectedCollectionComponent.vm.collection.value.handle).toEqual(
      collectionData.handle
    );
  });

  it('it calls setCollection with a collection object', () => {
    const collectionProvider = mount(CollectionProviderContainer());
    const injectedCollectionComponent = collectionProvider.findComponent({
      name: 'InjectedWithCollection'
    });
    jest.spyOn(injectedCollectionComponent.vm, 'setCollection');
    injectedCollectionComponent.vm.setCollection({
      collection: collectionData
    });
    expect(injectedCollectionComponent.vm.setCollection).toHaveBeenCalledTimes(
      1
    );
    expect(injectedCollectionComponent.vm.collection.value.handle).toEqual(
      collectionData.handle
    );
  });

  it('it calls setCollection with a collection handle', async () => {
    nacelleSdk.mockImplementation(() => ({
      data: {
        collection: () => Promise.resolve({ ...collectionData, products: [] }),
        collectionPage: () => Promise.resolve(collectionData.products)
      }
    }));
    const collectionProvider = mount(CollectionProviderContainer());
    const injectedCollectionComponent = collectionProvider.findComponent({
      name: 'InjectedWithCollection'
    });
    jest.spyOn(injectedCollectionComponent.vm, 'setCollection');
    await injectedCollectionComponent.vm.setCollection({
      handle: collectionData.handle
    });
    expect(injectedCollectionComponent.vm.setCollection).toHaveBeenCalledTimes(
      1
    );
    expect(injectedCollectionComponent.vm.collection.value.handle).toEqual(
      collectionData.handle
    );
  });

  it('it calls loadProducts with empty parameters', async () => {
    nacelleSdk.mockImplementation(() => ({
      data: {
        products: () => Promise.resolve(collectionData.products)
      }
    }));
    const collectionProvider = mount(
      CollectionProviderContainer({
        props: { collection: { ...collectionData, products: [] } }
      })
    );
    const injectedCollectionComponent = collectionProvider.findComponent({
      name: 'InjectedWithCollection'
    });
    jest.spyOn(injectedCollectionComponent.vm, 'loadProducts');
    await injectedCollectionComponent.vm.loadProducts({});
    expect(injectedCollectionComponent.vm.loadProducts).toHaveBeenCalledTimes(
      1
    );
    expect(injectedCollectionComponent.vm.collection.value.products).toEqual(
      collectionData.products
    );
  });
});
