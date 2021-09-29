# Nacelle

Nacelle is a managed backend service that acts as the connective tissue for headless commerce. Our infrastructure is built on an event-driven elastic core that Nacelle fully manages, so you don't have to worry about scaling, updates, and general DevOps. We focus on fighting headless headaches like eventual consistency, backend maintenance, and interoperability so you can build the things that matter to your brand without getting bogged down.

This repository contains packages and examples you can use to build your storefront.

## Setting up your development environment

This project uses [Lerna](https://lerna.js.org) to coordinate dependencies throughout the monorepo. Lerna allows us to make changes to a package and see the effects of those changes in other packages and example projects, without the need to manually mangage package symlinks via `npm link`.

When you clone this repository for the first time, run:

```
npm i && npm run bootstrap && npm run prepare
```

This will install Lerna, and will run Lerna's [`bootstrap`](https://github.com/lerna/lerna/blob/main/commands/bootstrap/README.md) command, which installs dependencies across `packages/` and `examples/` and creates symlinks between them. The `prepare` script initializes [Husky](https://typicode.github.io/husky), which supports linting of staged changes.

## Installing dependencies in packages and examples

When you run `npm i <some-new-package>` in a `packages/` or `examples/` project, you must run `npm run bootstrap` from the monorepo root again to restore symlinks.

Any `devDependencies` that are installed in `packages/` or `examples/` will be "hoisted" by Lerna into the monorepo root's `devDependencies`. This helps to reduce inconsistencies across projects and reduces disk space usage by using the root-level symlinked package across all `packages/` and `examples/` that use it.

## Creating a new package

From the monorepo root:

```
npm run create -- <package-name> packages/
```

This runs Lerna's [`create`](https://github.com/lerna/lerna/tree/main/commands/create#readme) script to create a new package in the `packages/` directory. Follow the prompts to create the new package.

Alternatively, you can:

1. `cd packages/`
2. create a new directory and `cd <new-directory>/`
3. run `npm init`
4. `cd ../../` back to the monorepo root
5. run `npm run bootstrap`

After creating `packages/<package-name>`, add the following script to its `package.json`:

```
"precommit": "lint-staged",
```

## Creating a new starter project

1. `cd starters/`
2. either run a project creation tool that scaffolds a new project, or manually create & `npm init` a project from scratch
3. `cd ../../` back to the monorepo root
4. run `npm run bootstrap`

After creating `starters/<project-name>`, add the following script to its `package.json`:

```
"precommit": "lint-staged",
```

## Creating a new example project

1. `cd examples/`
2. either run a project creation tool that scaffolds a new project, or manually create & `npm init` a project from scratch
3. `cd ../../` back to the monorepo root
4. run `npm run bootstrap`

After creating `examples/<project-name>`, add the following script to its `package.json`:

```
"precommit": "lint-staged",
```
