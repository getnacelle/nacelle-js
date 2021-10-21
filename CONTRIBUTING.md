# Contributing To Nacelle-js

👍🚀 Welcome to Nacelle-js! And thanks for taking the time to contribute to the project. 🚀👍

Before contributing we ask that you review the following guidelines. If you think the process can be improved, feel free to propose the changes in a pull request.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[Getting Started](#getting-started)

- [Packages](#packages)
- [Starters](#starters)
- [Examples](#examples)

[Making Contributions](#making-contributions)

- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Submitting Pull Requests](#submitting-pull-requests)

[Styleguides](#styleguides)

- [Pull Request Titles](#pull-request-titles)
- [Javascript Styleguide](#javascript-styleguide)
- [Specs Styleguide](#specs-styleguide)
- [Documentation Styleguide](#documentation-styleguide)

[Additional Resources](#additional-resources)

## Code Of Conduct

This project and everyone participating in it is governed by the [Nacelle Code of Conduct](CODE_OF_CONDUCT.md). All participants are expected to abide by this code. Please report unacceptable behavior to [support@getnacelle.com](mailto:support@getnacelle.com).

## Getting Started

Nacelle-js is a set of tools designed to empower developers to build unique, performant & scalable storefronts. The repository is broken the following parts.

### Packages

The `packages/` directory contains all of the project's installable npm packages. These packages should be modular and exclude all non-critical dependencies.

### Starters

The `starters/` directory contains all of the project's framework-specific starters. These starters should be minimal and should not impose any unnecessary coding conventions.

### Examples

The `examples/` directory contains all of the project's example implementations such as integrating 3rd party apps. These examples should contain the least amount of code required to function.

## Making Contributions

Nacelle-js contributions are key to the success of the project. There are a number of ways you can contribute.

### Reporting Bugs

We use [Github Issues](https://guides.github.com/features/issues/) to track all reported bugs. Before submitting a bug we ask that you review our pre-bug [checklist](#before-submitting-a-bug).

#### Before Submitting A Bug Report

- **Reproduce the bug**. To eliminate any outside factors you should create an isolated code sandbox confirming the bug. The sandbox should include the minimal amount of code to reproduce the bug.

- **Check the discussions**. Once you've confirmed that you can reproduce the bug, you should check the [discussion board](https://github.com/getnacelle/nacelle-js/discussions) to see if there are any other recommended resolutions.

- **Perform a search**. Once you've checked that a solution does not exists in the discussion board, you should check to make sure the bug has not been filed already. To do so perform a [cursory search](https://github.com/search?q=+is%3Aissue+user%3AgetNacelle) on all existing issues.

#### How To Submit A Good Bug Report

When you've determined that the bug should be reported, fill out the [Bug Report Template](BUG_REPORT.md).

The following details are required so our maintainers can quickly identify and reproduce the bug.

- **Use a clear and descriptive title** for the issue to identify the problem.

- **Describe the exact steps which reproduce the problem** in as many details as possible.

- **Provide a reproduction of bug** in an minimal & isolated code sandbox.

- **Describe the actual behavior** that prompted you to report the bug.

- **Describe the expected behavior** you think should occur.

- **Include any additional resources** such as screenshots, gifs or videos showcasing the bug.

### Suggesting Enhancements

We use [Github Issues](https://guides.github.com/features/issues/) to track all suggested enhancements. Before submitting an enhancement we ask that you review our pre-enhancement [checklist](#before-submitting-an-enhacnement).

#### Before Submitting An Enhancement

- **Check for related enhancement**. To ensure your suggested enhancement is not covered by another package, you should check all related packages first.

- **Check the discussions**. Once you've confirmed that your suggested enhancement is not covered by another package, you should check the [discussion board](https://github.com/getnacelle/nacelle-js/discussions) to see if there are any discussions pertaining to the enhancement.

- **Perform a search**. Once you've checked that a enhancement does not exist in the discussion board or an existing package, you should should check to make sure the enhancement has not been proposed already. To do perform a [cursory search](https://github.com/search?q=+is%3Aissue+user%3AgetNacelle) on all existing issues.

#### How To Submit A Good Enhancement

When you've determined that the enhancement should be reported, fill out the [Suggest Enhancement Template](SUGGEST_ENHANCEMENT.md).

The following details are required so our maintainers can quickly understand the enhancement.

- **Use a clear and descriptive title** for the issue to identify the suggestion.

- **Describe the exact steps which should be taken** in as many details as possible.

- **Provide a demonstration of enhancement** in an minimal & isolated code sandbox.

- **Describe the expected behavior** you think should occur.

- **Include any additional resources** such as screenshots, gifs or videos showcasing the bug.

### Submitting Pull Requests

We enforce conventional pull request titles to ensure all pull requests are easily understood and categorized. For more information on how we enforce PR titles check out our [styleguides](#styleguides).

#### Making Your First Contribution

Unsure of how to start contributing to Nacelle-js? We recommend you begin by checking for issues tagged with `bugfix`, `docs` or `beginner`. These issues can provide a great introduction into our processes and codebase.

#### Before Submitting A Pull Request

Before opening a pull request you should review all of our [styleguides](#styleguides) to ensure your code conforms to our standards. You should also ensure all test suites are passing.

#### How To Submit A Good Pull Request

To make the process as easy as possible we've created a Pull Request Template that will be added to your PR when you create it. Be sure to fill out all the required fields with as much detail and context as possible.

### Styleguides

#### Pull Request Titles

All pull request titles must follow the conventional commit patterns.

##### Default

```
<type>(<optional scope>): <subject>
empty separator line
<optional body>
empty separator line
<optional footer>
```

##### Merge

```
Merge branch '<branch name>'
```

##### Revert

```
Revert branch '<branch name>'
```

##### Types

- **feat** PR that adds a new feature
- **fix** PR that fixes a bug
- **refactor** PR that rewrites/restructures code
- **perf** PR that improves performance
- **style** PR that does not affect functionality or meaning (white-space, formatting, missing semi-colons, etc)
- **test** PR that adds missing tests or adjusts current tests
- **docs** PR that affects documentation only
- **build** PR that affects build tools, pipelines, dependencies, versions...
- **chore** PR that makes miscellaneous adjustments e.g. modifiying `.gitignore`

##### Scopes

The `scope` provides additional contextual information.

- Is an optional part of the format
- Allowed Scopes depends on the specific project
- Don't use issue identifiers as scopes

##### Subject

The `subject` contains a succinct description of the change.

- Is a mandatory part of the format
- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

##### Body

The `body` should include the motivation for the change and contrast this with previous behavior.

- Is an optional part of the format
- Use the imperative, present tense: "change" not "changed" nor "changes"
- This is the place to mention issue identifiers and their relations

##### Footer

The `footer` should contain any information about Breaking Changes and is also the place to reference Issues that this commit refers to.

- Is an optional part of the format
- optionally reference an issue by its id.
- Breaking Changes should start with the word BREAKING CHANGES: followed by space or two newlines. The rest of the commit message is then used for this.

###### Examples

- ```
  feat(cart apple pay): add the apple pay button to cart
  ```
- ```
  feat: swap out checkout service for module

  refers to JIRA-1337
  BREAKING CHANGES: checkout service will no longer work
  ```

- ```
  fix: add missing parameter to checkout url

  The error causes referral params to fall off
  ```

- ```
  refactor: swaps out loop for map
  ```
- ```
  build: updates dependencies
  ```
- ```
  style: remove empty line
  ```

#### Javascript Styleguide

All JavaScript code is linted with [Prettier](https://prettier.io/).

- Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
- Inline `export`s with expressions whenever possible

  ```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```

- Place requires in the following order:
  - Built in Node Modules (such as `path`)
  - Built in Nacelle Modules (such as `@nacelle/vue`, `@nacelle/react`)
  - Local Modules (using relative paths)
- Place class properties in the following order:
  - Class methods and properties (methods starting with `static`)
  - Instance methods and properties

#### Specs Styleguide

- Include thoughtfully-worded, well-structured [Jest](https://github.com/facebook/jest/) specs in the appropriate directory's `./spec` folder.
- Treat `describe` as a noun or situation.
- Treat `it` as a statement about state or how an operation changes state.

#### Documentation Styleguide

- Use [Markdown](https://daringfireball.net/projects/markdown).
- Reference methods and classes in markdown with the custom `{}` notation:
  - Reference classes with `{ClassName}`
  - Reference instance methods with `{ClassName::methodName}`
  - Reference class methods with `{ClassName.methodName}`

## Additional Resources
