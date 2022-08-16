import StorefrontSdk from '@nacelle/storefront-sdk';
import type { StorefrontInstance } from '@nacelle/storefront-sdk';
import type { Ref } from 'vue';

const sdk: Ref<StorefrontInstance | null> = ref(null);

export default function (): StorefrontInstance {
  const runTimeConfig = useRuntimeConfig();
  if (!sdk.value) {
    sdk.value = StorefrontSdk({
      storefrontEndpoint: runTimeConfig.public.nacelle.storefrontEndpoint,
      token: runTimeConfig.public.nacelle.storefrontToken,
      previewToken:
        runTimeConfig.public.nacelle.previewToken &&
        runTimeConfig.public.nacelle.usePreview
          ? runTimeConfig.public.nacelle.previewToken
          : null
    });
  }
  return reactive(sdk.value);
}

export function setSdk(newSdk: StorefrontInstance): StorefrontInstance {
  sdk.value = newSdk;
  return reactive(newSdk);
}
