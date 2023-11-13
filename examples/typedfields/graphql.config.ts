import type { IGraphQLConfig } from 'graphql-config';

const config: IGraphQLConfig = {
  schema:
    'https://storefront.api.nacelle.com/graphql/v1/spaces/1e7f265f-688d-4932-978a-69e1152473a0',
  documents: '{app,components,pages,queries}/**/*.{graphql,js,ts,jsx,tsx}',
  extensions: {
    codegen: {
      ignoreNoDocuments: true,
      generates: {
        './gql/': {
          preset: 'client',
          presetConfig: {
            fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
          }
        }
      }
    }
  }
};

export default config;
