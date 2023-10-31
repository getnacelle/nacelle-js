# Example: Typed Fields in Next.js Project

This project is a [Next.js](https://nextjs.org/) application initiated with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
- [Codegen](#codegen)
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

## Typed Fields

### Leveraging Nacelle's TypedFields Feature

In this project, we make use of Nacelle's `TypedFields` feature. This enables fetching specific fields from referenced content, rather than relying on a more generic `fields` object.

Additionally this adds an extra layer of type safety, ensuring that you can only access fields that actually exist on the referenced content.
