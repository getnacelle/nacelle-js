# @nacelle/gatsby-source-nacelle

## 9.1.0

### Minor Changes

- 26c1b50: This fixes content linking bugs that result from the API changes:

  1. Excludes assets from content node linking logic since they are not queryable at the top level and thus not referenceable despite having NacelleEntryId's.
  2. Removes any unresolvable NacelleReferences from the content tree. These are usually due to unpublished/deleted content.

## 9.0.0

### Major Changes

- 8a32dc3: infer types for `Content.fields`

## 8.0.5

### Patch Changes

- 8676ed8: manually bump deps

## 8.0.4

### Patch Changes

- 33556d4: adds pagination to product collections query

## 8.0.3

### Patch Changes

- 21d5f2b: update type defs

## 8.0.2

### Patch Changes

- bdc263b: replace field key

## 8.0.1

- df512bb: add gatsby-source-nacelle package
