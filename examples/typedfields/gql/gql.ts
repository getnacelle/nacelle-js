/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment ArticleFragment on TypedFieldsExampleArticle {\n    nacelleEntryId\n    typedFields {\n      __typename\n      haiku\n      title\n      author {\n        typedFields {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.ArticleFragmentFragmentDoc,
    "\n  fragment LinkFragment on TypedFieldsExampleArticle {\n    nacelleEntryId\n    typedFields {\n      __typename\n      title\n      author {\n        typedFields {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.LinkFragmentFragmentDoc,
    "\n  fragment LinksFragment on TypedFieldsExampleLinks {\n    nacelleEntryId\n    typedFields {\n      __typename\n      title\n      links {\n        edges {\n          node {\n            typedFields {\n              handle\n              sections {\n                edges {\n                  node {\n                    ...LinkFragment\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.LinksFragmentFragmentDoc,
    "\n  query ContentRoutes {\n    pages: allContent(filter: { type: \"page\" }) {\n      edges {\n        node {\n          handle\n        }\n      }\n    }\n  }\n": types.ContentRoutesDocument,
    "\n  query allContent($handle: String!) {\n    allContent(filter: { type: \"page\", handles: [$handle] }) {\n      edges {\n        node {\n          handle\n          nacelleEntryId\n          typedFields {\n            ... on TypedFieldsExamplePageFields {\n              __typename\n              handle\n              title\n              sections {\n                edges {\n                  node {\n                    ...ArticleFragment\n                    ...LinksFragment\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.AllContentDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ArticleFragment on TypedFieldsExampleArticle {\n    nacelleEntryId\n    typedFields {\n      __typename\n      haiku\n      title\n      author {\n        typedFields {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ArticleFragment on TypedFieldsExampleArticle {\n    nacelleEntryId\n    typedFields {\n      __typename\n      haiku\n      title\n      author {\n        typedFields {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment LinkFragment on TypedFieldsExampleArticle {\n    nacelleEntryId\n    typedFields {\n      __typename\n      title\n      author {\n        typedFields {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment LinkFragment on TypedFieldsExampleArticle {\n    nacelleEntryId\n    typedFields {\n      __typename\n      title\n      author {\n        typedFields {\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment LinksFragment on TypedFieldsExampleLinks {\n    nacelleEntryId\n    typedFields {\n      __typename\n      title\n      links {\n        edges {\n          node {\n            typedFields {\n              handle\n              sections {\n                edges {\n                  node {\n                    ...LinkFragment\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment LinksFragment on TypedFieldsExampleLinks {\n    nacelleEntryId\n    typedFields {\n      __typename\n      title\n      links {\n        edges {\n          node {\n            typedFields {\n              handle\n              sections {\n                edges {\n                  node {\n                    ...LinkFragment\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ContentRoutes {\n    pages: allContent(filter: { type: \"page\" }) {\n      edges {\n        node {\n          handle\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ContentRoutes {\n    pages: allContent(filter: { type: \"page\" }) {\n      edges {\n        node {\n          handle\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allContent($handle: String!) {\n    allContent(filter: { type: \"page\", handles: [$handle] }) {\n      edges {\n        node {\n          handle\n          nacelleEntryId\n          typedFields {\n            ... on TypedFieldsExamplePageFields {\n              __typename\n              handle\n              title\n              sections {\n                edges {\n                  node {\n                    ...ArticleFragment\n                    ...LinksFragment\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query allContent($handle: String!) {\n    allContent(filter: { type: \"page\", handles: [$handle] }) {\n      edges {\n        node {\n          handle\n          nacelleEntryId\n          typedFields {\n            ... on TypedFieldsExamplePageFields {\n              __typename\n              handle\n              title\n              sections {\n                edges {\n                  node {\n                    ...ArticleFragment\n                    ...LinksFragment\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;