import { mount } from '@vue/test-utils';
import { set, get } from 'idb-keyval';
import CartProvider from '~/providers/CartProvider';

const product = {
  image: {
    source: 'https://nacelle-assets.s3-us-west-2.amazonaws.com/shirt.jpg'
  },
  title: 'Gray T-Shirt',
  productId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzM1OTkyMDE4NjE3Mzc=',
  handle: 'gray-t-shirt',
  quantity: 1,
  variant: {
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDAyMzQwMQ=='
  }
};

const InjectedComponent = () => {
  return {
    name: 'InjectedComponent',
    inject: [
      'cart',
      'addItem',
      'removeItem',
      'updateItem',
      'incrementItem',
      'decrementItem',
      'clearCart'
    ],
    template: `<div></div>`
  };
};

const CartProviderContainer = ({ props = {} } = {}) => ({
  render: (h) => h(CartProvider, { props }, [h(InjectedComponent())])
});

jest.mock('idb-keyval');

describe('Cart Provider', () => {
  beforeEach(() => {
    set.mockClear();
    get.mockClear();
  });

  it('provides `cart`, `addItem`, `removeItem`, `updateItem`, `incrementItem`, `decrementItem`, `clearCart` to children', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(typeof injectedComponent.vm.addItem).toEqual('function');
    expect(typeof injectedComponent.vm.removeItem).toEqual('function');
    expect(typeof injectedComponent.vm.updateItem).toEqual('function');
    expect(typeof injectedComponent.vm.incrementItem).toEqual('function');
    expect(typeof injectedComponent.vm.decrementItem).toEqual('function');
    expect(typeof injectedComponent.vm.clearCart).toEqual('function');
  });

  it('gets cached cart from IndexedDB when mounted', (done) => {
    get.mockResolvedValue([{ ...product }]);
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    setTimeout(() => {
      try {
        expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
        expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
        expect(injectedComponent.vm.cart.lineItems[0]).toMatchObject(product);
        expect(get).toHaveBeenCalledTimes(1);
        expect(get).toHaveBeenCalledWith('cart');
        done();
      } catch (error) {
        done(error);
      }
    }, 10);
  });

  it('adds item to cart with `addItem`', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({ ...product });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].id).toContain(
      product.variant.id
    );
    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith(
      'cart',
      injectedComponent.vm.cart.lineItems
    );
  });

  it('adds item to cart with a custom cache key with `addItem`', () => {
    const cartProvider = mount(
      CartProviderContainer({ props: { cacheKey: 'custom-cart' } })
    );
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({ ...product });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].id).toContain(
      product.variant.id
    );
    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith(
      'custom-cart',
      injectedComponent.vm.cart.lineItems
    );
  });

  it('increases quantity with `addItem` if item is already in cart', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({ ...product });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].quantity).toBe(1);

    injectedComponent.vm.addItem({ ...product });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].quantity).toBe(2);

    expect(set).toHaveBeenCalledTimes(2);
    expect(set).toHaveBeenCalledWith(
      'cart',
      injectedComponent.vm.cart.lineItems
    );
  });

  it('removes item from cart with `removeItem`', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({ ...product });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);

    const cart = injectedComponent.vm.cart.lineItems;
    injectedComponent.vm.removeItem(cart[0].id);

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(0);

    expect(set).toHaveBeenCalledTimes(2);
    expect(set).toHaveBeenCalledWith(
      'cart',
      injectedComponent.vm.cart.lineItems
    );
  });

  it('updates item in cart with `updateItem`', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({ ...product });
    injectedComponent.vm.addItem({
      ...product,
      variant: { ...product.variant, id: 12345 }
    });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(2);

    const cart = injectedComponent.vm.cart.lineItems;
    const updatedProduct = {
      ...product,
      id: cart[0].id,
      quantity: 2
    };
    injectedComponent.vm.updateItem(updatedProduct);

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(2);
    expect(injectedComponent.vm.cart.lineItems[0]).toMatchObject(
      updatedProduct
    );
    expect(injectedComponent.vm.cart.lineItems[1].id).toContain(12345);

    expect(set).toHaveBeenCalledTimes(3);
    expect(set).toHaveBeenCalledWith(
      'cart',
      injectedComponent.vm.cart.lineItems
    );
  });

  it('increases item quantity by 1 with `incrementItem`', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({ ...product });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].quantity).toBe(1);

    const cart = injectedComponent.vm.cart.lineItems;
    injectedComponent.vm.incrementItem(cart[0].id);

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].quantity).toBe(2);

    expect(set).toHaveBeenCalledTimes(2);
    expect(set).toHaveBeenCalledWith(
      'cart',
      injectedComponent.vm.cart.lineItems
    );
  });

  it('decreases item quantity by 1 with `decrementItem`', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({ ...product, quantity: 2 });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].quantity).toBe(2);

    const cart = injectedComponent.vm.cart.lineItems;
    injectedComponent.vm.decrementItem(cart[0].id);

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].quantity).toBe(1);
  });

  it('removes item at 0 quantity with `decrementItem`', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({ ...product, quantity: 1 });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].quantity).toBe(1);

    const cart = injectedComponent.vm.cart.lineItems;
    injectedComponent.vm.decrementItem(cart[0].id);

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(0);

    expect(set).toHaveBeenCalledTimes(2);
    expect(set).toHaveBeenCalledWith(
      'cart',
      injectedComponent.vm.cart.lineItems
    );
  });

  it('clears the cart with `clearCart`', () => {
    const cartProvider = mount(CartProviderContainer());
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({
      ...product,
      variant: { ...product.variant, id: 12345 }
    });
    injectedComponent.vm.addItem({
      ...product,
      variant: { ...product.variant, id: 67890 }
    });

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(2);

    injectedComponent.vm.clearCart();

    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(0);

    expect(set).toHaveBeenCalledTimes(3);
    expect(set).toHaveBeenCalledWith(
      'cart',
      injectedComponent.vm.cart.lineItems
    );
  });

  it('does not `get` from IndexedDB when mounted if `persistence` is false', () => {
    const cartProvider = mount(
      CartProviderContainer({ props: { persistence: false } })
    );
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(0);
    expect(get).toHaveBeenCalledTimes(0);
  });

  it('does not `set` to IndexedDB if `persistence` is false', () => {
    const cartProvider = mount(
      CartProviderContainer({ props: { persistence: false } })
    );
    const injectedComponent = cartProvider.findComponent({
      name: 'InjectedComponent'
    });
    injectedComponent.vm.addItem({
      ...product
    });
    expect(Array.isArray(injectedComponent.vm.cart.lineItems)).toBe(true);
    expect(injectedComponent.vm.cart.lineItems.length).toBe(1);
    expect(injectedComponent.vm.cart.lineItems[0].id).toContain(
      product.variant.id
    );
    expect(set).toHaveBeenCalledTimes(0);
  });
});
