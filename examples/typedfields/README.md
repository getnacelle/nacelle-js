# Example: Content Queries with Typed Fields

This project is a [Next.js](https://nextjs.org) application that demonstrates how to use Nacelle's `typedFields` feature to fetch specific fields for various content types, complete with type safety and an autocomplete experience for GraphQL queries.

## Table of Contents

- [Getting Started](#getting-started)
- [Codegen](#codegen)
- [GraphQL Config](#graphql-config)
- [Typed Fields](#typed-fields)

## Getting Started

### Running the Development Server

To start the development server, execute one of the following commands in your terminal:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, navigate to [http://localhost:3000](http://localhost:3000) in your web browser to interact with the running application.

## Codegen

### Generating TypeScript Types with GraphQL Code Generator

This project leverages [GraphQL Code Generator](https://docs.nacelle.com/docs/graphql-codegen) to automatically create TypeScript types based on the GraphQL queries and mutations.

To generate the types, run:

```bash
npm run codegen
# or
yarn codegen
# or
pnpm codegen
# or
bun codegen
```

**Note:** You should rerun this command whenever you modify any GraphQL queries or mutations to keep the TypeScript types up-to-date.

The queries in this project demonstrate [Fragment Masking](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#fragment-masking), which is a technique that makes it easier to define the data requirements for individual components, using [GraphQL fragments](https://graphql.org/learn/queries/#fragments).

## GraphQL Config

This project uses [GraphQL Config](https://the-guild.dev/graphql/config) to enable autocomplete and linting for GraphQL queries:

![Screen capture a TypeScript file in VSCode shows the crafting of a query to the Nacelle Storefront GraphQL API for `Content.typedFields`. The fields available for querying are listed via autocomplete.]('./docs/assets/demo-graphql-config-autocomplete-with-typed-fields.gif' 'Autocomplete powered by GraphQL Config')

This allows developers to author queries without constantly referring to their Nacelle Storefront GraphQL API schema, and without a priori knowledge of the fields available in various content types.

To take advantage of this feature with VSCode, be sure to install the following VSCode extensions:

- [`GraphQL.vscode-graphql`](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
- [`GraphQL.vscode-graphql-syntax`](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax)

## Typed Fields

### Leveraging Nacelle's Typed Fields Feature

In this project, we make use of Nacelle's Typed Fields feature. This enables fetching specific fields from referenced content, rather than relying on an unstructured `fields: JSON` object. Queries with `typedFields` are found in `app/components/*.tsx` and `app/**/page.tsx`.

Additionally this adds an extra layer of type safety, ensuring that you can only access fields that actually exist on various content types.
