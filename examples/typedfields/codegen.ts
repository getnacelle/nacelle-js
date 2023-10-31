import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://storefront.api.nacelle.com/graphql/v1/spaces/1e7f265f-688d-4932-978a-69e1152473a0',
  documents: './{app,components,pages,queries}/**/*.{graphql,js,ts,jsx,tsx}',
  generates: {
    'gql/': {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;
