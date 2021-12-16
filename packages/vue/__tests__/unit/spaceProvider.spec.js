import { mount } from '@vue/test-utils';
import { linklists, mainMenu } from 'mocks/linklists';
import SpaceProvider from '~/providers/SpaceProvider';

const config = {
  nacelleId: process.env.NACELLE_SPACE_ID,
  nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.NACELLE_ENDPOINT
};

jest.mock('@nacelle/client-js-sdk');

const InjectedWithSpaceData = () => {
  return {
    name: 'InjectedWithSpaceData',
    inject: [
      'id',
      'metafields',
      'linklists',
      'nacelleSdk',
      'getMetatag',
      'getMetafieldsObj',
      'getMetafieldsByNamespace',
      'getMetafield',
      'getLinks'
    ],
    render: (h) => h('div')
  };
};

const SpaceProviderContainer = ({ props }) => ({
  render: (h) =>
    h(SpaceProvider, { props: { ...props, config } }, [
      h(InjectedWithSpaceData())
    ])
});

describe('Space Provider', () => {
  const space = {
    id: '1234',
    name: 'test-store',
    domain: 'test-store.com',
    metafields: [
      {
        namespace: 'metatag',
        key: 'og:image',
        value: 'https://demo.getnacelle.com/starship_logo.png'
      }
    ],
    linklists
  };

  it('gets metafield object', () => {
    const spaceProvider = mount(
      SpaceProviderContainer({ props: { space, sdk: { data: 'data' } } })
    );
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.getMetafieldsObj()).toEqual({
      metatag: { 'og:image': 'https://demo.getnacelle.com/starship_logo.png' }
    });
  });

  it('gets metafield', () => {
    const spaceProvider = mount(
      SpaceProviderContainer({ props: { space, sdk: { data: 'data' } } })
    );
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(
      injectedSpaceComponent.vm.getMetafield({
        namespace: 'metatag',
        key: 'og:image'
      })
    ).toEqual('https://demo.getnacelle.com/starship_logo.png');
  });

  it('gets metatag', () => {
    const spaceProvider = mount(
      SpaceProviderContainer({ props: { space, sdk: { data: 'data' } } })
    );
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.getMetatag('og:image')).toEqual({
      namespace: 'metatag',
      key: 'og:image',
      value: 'https://demo.getnacelle.com/starship_logo.png'
    });
  });

  it('gets metafields by namespace', () => {
    const spaceProvider = mount(
      SpaceProviderContainer({ props: { space, sdk: { data: 'data' } } })
    );
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(
      injectedSpaceComponent.vm.getMetafieldsByNamespace('metatag')
    ).toEqual({
      'og:image': 'https://demo.getnacelle.com/starship_logo.png'
    });
  });

  it('gets links by handle', () => {
    const spaceProvider = mount(
      SpaceProviderContainer({ props: { space, sdk: { data: 'data' } } })
    );
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.getLinks('main-menu')).toEqual(
      mainMenu.links
    );
  });

  it('receives sdk prop', () => {
    const spaceProvider = mount(
      SpaceProviderContainer({ props: { space, sdk: { data: 'data' } } })
    );
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.nacelleSdk).toEqual({ data: 'data' });
  });

  it('calls getLinks when none exist', () => {
    const spaceProvider = mount(SpaceProviderContainer({ props: {} }));
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.getLinks('main-menu')).toEqual([]);
  });

  it('calls getMetafield when none exist', () => {
    const spaceProvider = mount(SpaceProviderContainer({ props: {} }));
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.getMetafield('main-menu')).toEqual(null);
  });

  it('calls getMetatag when none exist', () => {
    const spaceProvider = mount(SpaceProviderContainer({ props: {} }));
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.getMetatag('tag')).toEqual(null);
  });

  it('calls getMetafieldsObj when none exist', () => {
    const spaceProvider = mount(SpaceProviderContainer({ props: {} }));
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.getMetafieldsObj()).toEqual(null);
  });

  it('calls getMetafieldsByNamespace when none exist', () => {
    const spaceProvider = mount(SpaceProviderContainer({ props: {} }));
    const injectedSpaceComponent = spaceProvider.findComponent({
      name: 'InjectedWithSpaceData'
    });
    expect(injectedSpaceComponent.vm.getMetafieldsByNamespace('test')).toEqual(
      null
    );
  });
});
