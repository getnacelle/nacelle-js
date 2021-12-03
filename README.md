# Nacelle

Nacelle is a managed backend service that acts as the connective tissue for headless commerce. Our infrastructure is built on an event-driven elastic core that Nacelle fully manages, so you don't have to worry about scaling, updates, and general DevOps. We focus on fighting headless headaches like eventual consistency, backend maintenance, and interoperability so you can build the things that matter to your brand without getting bogged down.

This repository contains packages and examples you can use to build your storefront.

## How to Use

### Packages

All `nacelle-js` [**packages**](https://github.com/getnacelle/nacelle-js/tree/main/packages) are published to npm. Please refer to a package's README for installation instructions.

### Examples

[**Examples**](https://github.com/getnacelle/nacelle-js/tree/main/examples) demonstrate how to achieve a specific goal. They are intended to be reference points, and aren't intended to be the foundation for new eCommerce projects.

To scaffold a frontend example project, we recommend using [`degit`](https://www.npmjs.com/package/degit):

```
npx degit https://github.com/getnacelle/nacelle-js/examples/<example-project-name>
```

### Starters

[**Starters**](https://github.com/getnacelle/nacelle-js/tree/main/starters) provide scaffolding for new eCommerce projects. You can create a new project with `@nacelle/create`:

```
npx @nacelle/create your-project-name
```

## How to Contribute

- [Submit a Pull Request](./CONTRIBUTING)
- [Report bugs](./BUG_REPORT)
- [Suggest an enhancement](./SUGGEST_ENHANCEMENT)
