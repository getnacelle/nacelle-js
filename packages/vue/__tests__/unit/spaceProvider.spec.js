import { createLocalVue, mount } from '@vue/test-utils';
import CompositionApi from '@vue/composition-api';
import { linklists, mainMenu } from 'mocks/linklists';
import SpaceProvider from '~/providers/SpaceProvider';

const localVue = createLocalVue();
localVue.use(CompositionApi);

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
      'getMetafieldsObj',
      'getMetafield',
      'getLocalizedLinks'
    ],
    template: `<div></div>`
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

  const spaceProvider = mount(SpaceProviderContainer({ props: { space } }), {
    localVue
  });
  const injectedSpaceComponent = spaceProvider.findComponent({
    name: 'InjectedWithSpaceData'
  });

  it('gets metafield object', () => {
    expect(injectedSpaceComponent.vm.getMetafieldsObj()).toEqual({
      metatag: { 'og:image': 'https://demo.getnacelle.com/starship_logo.png' }
    });
  });

  it('gets metafield', () => {
    expect(
      injectedSpaceComponent.vm.getMetafield({
        namespace: 'metatag',
        key: 'og:image'
      })
    ).toEqual('https://demo.getnacelle.com/starship_logo.png');
  });

  it('gets menu by handle', () => {
    expect(injectedSpaceComponent.vm.getLocalizedLinks('main-menu')).toEqual(
      mainMenu.links
    );
  });
});
