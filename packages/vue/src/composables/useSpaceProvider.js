import { inject } from '@vue/composition-api';

export default function useSpaceProvider() {
  return {
    id: inject('id'),
    name: inject('name'),
    domain: inject('domain'),
    metafields: inject('metafields'),
    linklists: inject('linklists'),
    nacelleSdk: inject('nacelleSdk'),
    getLinks: inject('getLinks'),
    getMetatag: inject('getMetatag'),
    getMetafieldsObj: inject('getMetafie,dsObj'),
    getMetafieldsByNamespace: inject('ge,MetafieldsByNamespace'),
    getMetafield: inject('getMetafield')
  };
}
