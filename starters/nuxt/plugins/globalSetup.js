import {
  onGlobalSetup,
  useContext,
  provide,
  useAsync
} from '@nuxtjs/composition-api';
import { useSdk } from '@nacelle/vue';

export default () => {
  onGlobalSetup(() => {
    const { $config } = useContext();
    const sdk = useSdk({ config: $config.nacelle });
    const initialSpace = useAsync(() => sdk.data.space());

    /**
     * Get metatags from metafields
     * @param {String} tag
     * @returns {Object|null}
     */
    const getMetatag = (tag) => {
      if (initialSpace.metafields) {
        return initialSpace.metafields.find(
          (field) => field.namespace === 'metatag' && field.key === tag
        );
      }
      return null;
    };
    provide('initialSpace', initialSpace);
    provide('getMetatag', getMetatag);
  });
};
