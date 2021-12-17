import { mount } from '@vue/test-utils';
import EventProvider from '~/providers/EventProvider';

const eventTypes = {
  productView: 'PRODUCT_VIEW',
  collectionView: 'COLLECTION_VIEW',
  pageView: 'PAGE_VIEW'
};

const sanitizeTemplateObject = (event) =>
  `${JSON.stringify(event)}`.replace(/"/g, `'`);

const InjectedComponent = (event) => {
  const onClick = event
    ? `() => addEvent(${sanitizeTemplateObject(event)})`
    : `() => {}`;

  return {
    name: 'InjectedWithEvents',
    inject: ['events', 'onEvent', 'addEvent'],
    template: `<button @click="${onClick}"></button>`
  };
};

const EventProviderContainer = ({ props = {}, event } = {}) => ({
  render: (h) => h(EventProvider, { props }, [h(InjectedComponent(event))])
});

describe('Event Bus', () => {
  it('provides `events`, `onEvent`, and `addEvent` to children', () => {
    const eventProvider = mount(EventProviderContainer());
    const injectedEventsComponent = eventProvider.findComponent({
      name: 'InjectedWithEvents'
    });

    expect(Array.isArray(injectedEventsComponent.vm.events.value)).toBe(true);
    expect(typeof injectedEventsComponent.vm.onEvent).toEqual('function');
    expect(typeof injectedEventsComponent.vm.addEvent).toEqual('function');
  });

  it('registers an event sent with `addEvent`', async () => {
    const pageViewEvent = {
      type: eventTypes.pageView,
      payload: { handle: 'some-page' }
    };
    const pageViewEventHandler = {
      type: eventTypes.pageView,
      callback: jest.fn()
    };
    const eventProvider = mount(
      EventProviderContainer({
        event: pageViewEvent,
        props: {
          eventHandlers: [pageViewEventHandler]
        }
      })
    );
    const injectedEventsComponent = eventProvider.findComponent({
      name: 'InjectedWithEvents'
    });

    const button = injectedEventsComponent.find('button');
    await button.trigger('click');

    expect(Array.isArray(injectedEventsComponent.vm.events.value)).toBe(true);
    expect(injectedEventsComponent.vm.events.value.length).toBe(1);
    expect(injectedEventsComponent.vm.events.value[0]).toMatchObject(
      pageViewEvent
    );
    expect(pageViewEventHandler.callback).toHaveBeenCalledTimes(1);
  });

  it('runs an callback registered with `onEvent` when a corresponding event occurs', async () => {
    const collectionViewEvent = {
      type: eventTypes.collectionView,
      payload: { handle: 'some-collection' }
    };
    const eventProvider = mount(
      EventProviderContainer({ event: collectionViewEvent })
    );
    const injectedEventsComponent = eventProvider.findComponent({
      name: 'InjectedWithEvents'
    });
    const button = injectedEventsComponent.find('button');

    // We'll make sure that the callback associated with the event is called...
    const expectedCallback = jest.fn();
    injectedEventsComponent.vm.onEvent({
      type: eventTypes.collectionView,
      callback: expectedCallback
    });

    // We'll also make sure that a callback associated with a different event isn't called...
    const unexpectedCallback = jest.fn();
    injectedEventsComponent.vm.onEvent({
      type: eventTypes.productView,
      callback: unexpectedCallback
    });

    await button.trigger('click');

    expect(Array.isArray(injectedEventsComponent.vm.events.value)).toBe(true);
    expect(injectedEventsComponent.vm.events.value.length).toBe(1);
    expect(expectedCallback).toHaveBeenCalledTimes(1);
    expect(expectedCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        ...collectionViewEvent
      })
    );
    expect(unexpectedCallback).toHaveBeenCalledTimes(0);
  });

  it('prevents the event log from growing beyond its maximum length', async () => {
    const productViewEvent = {
      type: eventTypes.productView,
      payload: { handle: 'some-product' }
    };
    const eventProvider = mount(
      EventProviderContainer({
        props: { maxLength: 5 },
        event: productViewEvent
      })
    );
    const injectedEventsComponent = eventProvider.findComponent({
      name: 'InjectedWithEvents'
    });
    const button = injectedEventsComponent.find('button');

    const callback = jest.fn();
    injectedEventsComponent.vm.onEvent({
      type: eventTypes.productView,
      callback
    });

    for (let step = 0; step < 10; step++) {
      await button.trigger('click');
    }

    expect(Array.isArray(injectedEventsComponent.vm.events.value)).toBe(true);
    expect(callback).toHaveBeenCalledTimes(10);
    expect(injectedEventsComponent.vm.events.value.length).toBe(5);
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        ...productViewEvent
      })
    );
  });

  it('calls `onEvent` without type', async () => {
    const eventProvider = mount(EventProviderContainer({}));
    const injectedEventsComponent = eventProvider.findComponent({
      name: 'InjectedWithEvents'
    });
    jest.spyOn(injectedEventsComponent.vm, 'onEvent');
    console.warn = jest.fn();
    injectedEventsComponent.vm.onEvent({ type: null });
    expect(console.warn).toHaveBeenCalledWith(
      "[nacelle] events passed to the EventProvider's `onEvent` method must have a `type`."
    );
  });

  it('calls `onEvent` without callback', async () => {
    const eventProvider = mount(EventProviderContainer({}));
    const injectedEventsComponent = eventProvider.findComponent({
      name: 'InjectedWithEvents'
    });
    jest.spyOn(injectedEventsComponent.vm, 'onEvent');
    console.warn = jest.fn();
    injectedEventsComponent.vm.onEvent({ type: 'type', callback: null });
    expect(console.warn).toHaveBeenCalledWith(
      "[nacelle] events passed to the EventProvider's `onEvent` method must have a valid `callback` function."
    );
  });
});
