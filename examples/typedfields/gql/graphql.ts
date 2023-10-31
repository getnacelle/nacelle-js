/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Count: { input: any; output: any; }
  /** A base64 encoded string */
  Cursor: { input: any; output: any; }
  /** A signed decimal number, which supports arbitrary precision and is serialized as a string. Example value: "29.99". */
  Decimal: { input: any; output: any; }
  /** Represents the status of a fulfillment. Possible values: open, partially_fulfilled, in_progress, scheduled, cancelled, on_hold, incomplete, succeeded */
  FulfillmentStatus: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** Maps represent a custom json object attached to a resource. */
  Map: { input: any; output: any; }
  /** Represents a nullable time */
  NullTime: { input: any; output: any; }
  /** Represents the status of a payment. Possible values: created, pending, succeeded, failed, requires_confirmation, balance_due, credit_owed */
  PaymentStatus: { input: any; output: any; }
  /** Represents the enum for services used for calculating TaxResult */
  Service: { input: any; output: any; }
  /** Represents a date and time according to ISO-8601 */
  Time: { input: any; output: any; }
  /** Represents a UUID according to RFC 4122 */
  UUID: { input: any; output: any; }
  /** Represents a positive integer value */
  Uint: { input: any; output: any; }
};

/** An Address is a object representing a physical address that can be used for shipping or billing */
export type Address = {
  __typename?: 'Address';
  /** The first line of the address. Typically the street address or PO Box number. */
  address1: Scalars['String']['output'];
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']['output']>;
  /** The name of the city, district, village, or town */
  city: Scalars['String']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  /** @deprecated use countryISO2 instead */
  country: Scalars['String']['output'];
  /** The two-letter code for the country of the address. */
  countryISO2: Scalars['String']['output'];
  /** The unique address id */
  id: Scalars['UUID']['output'];
  /** The postal code for the address */
  postalCode: Scalars['String']['output'];
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']['output']>;
  /** The state for the address */
  state: Scalars['String']['output'];
  /** @deprecated use postalCode instead */
  zip: Scalars['String']['output'];
};

/** An input type for associated address data */
export type AddressInput = {
  /** The first line of the address e.g. 123 Main St */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** The second line of the address e.g. Apt 1 */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** The city of the address e.g. San Francisco */
  city?: InputMaybe<Scalars['String']['input']>;
  /** A comment about the address */
  comment?: InputMaybe<Scalars['String']['input']>;
  /** The country ISO2 code of the address, e.g. US */
  countryIso2?: InputMaybe<Scalars['String']['input']>;
  /** The unique address id */
  id?: InputMaybe<Scalars['String']['input']>;
  /** The postal code of the address e.g. 94111 */
  postalCode?: InputMaybe<Scalars['String']['input']>;
  /** The province of the address */
  province?: InputMaybe<Scalars['String']['input']>;
  /** The state of the address e.g. CA */
  state?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a tax result calculated by a tax service containing the tax data for the cart */
export type CalcResult = {
  __typename?: 'CalcResult';
  /** When the tax result was created */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** Currency in ISO 4217 three-letter format. */
  currency?: Maybe<Scalars['String']['output']>;
  /** Time at which the tax data will expire. Measured in seconds since the Unix epoch. */
  expiresAt?: Maybe<Scalars['Int']['output']>;
  /** External ID used in tax service API (e.g. stripe). */
  externalID?: Maybe<Scalars['String']['output']>;
  /** Tax data for order items. */
  items?: Maybe<CalcResultItemsData>;
  /** Service that was used for generating tax data */
  service?: Maybe<Scalars['Service']['output']>;
  /** Tax data for order shipping. */
  shipping?: Maybe<CalcResultShippingData>;
  /** Tax datetime that was used for calculating the tax data. Measured in seconds since the Unix epoch. */
  taxDate?: Maybe<Scalars['Int']['output']>;
};

/** Represents a tax result entry */
export type CalcResultEntry = {
  __typename?: 'CalcResultEntry';
  /** Amount used for calculating taxes in string-decimal format. */
  amount?: Maybe<Scalars['String']['output']>;
  /** Tax details breakdown (if tax service API provides this data). */
  breakdown?: Maybe<Array<Maybe<CalcResultEntryBreakdown>>>;
  /** Item ID. Filled only for items data. */
  orderItemID?: Maybe<Scalars['String']['output']>;
  /** Quantity of items. Filled only for items data. */
  quantity?: Maybe<Scalars['Uint']['output']>;
  /** Amount of taxes for this object in string-decimal format. */
  taxAmount?: Maybe<Scalars['String']['output']>;
  /**
   * Specifies whether the `amount` includes taxes.
   * Could be 'inclusive' or 'exclusive'.
   */
  taxBehavior?: Maybe<Scalars['String']['output']>;
  /**
   * Tax code used for calculating taxes for this object.
   * Depends on the used tax service API.
   */
  taxCode?: Maybe<Scalars['String']['output']>;
};

/** Represents a breakdown of a tax result entry */
export type CalcResultEntryBreakdown = {
  __typename?: 'CalcResultEntryBreakdown';
  /** Amount of tax in string-decimal format. */
  amount?: Maybe<Scalars['String']['output']>;
  /**
   * A localized display name for tax type, intended to be human-readable.
   * Depends on the used tax service API.
   */
  displayName?: Maybe<Scalars['String']['output']>;
  /** The tax rate percentage in string-decimal format. */
  percentage?: Maybe<Scalars['String']['output']>;
  /**
   * The tax type, such as 'vat' or 'sales_tax'.
   * Depends on the used tax service API.
   */
  taxType?: Maybe<Scalars['String']['output']>;
  /**
   * The reasoning behind this tax.
   * Depends on the used tax service API.
   */
  taxabilityReason?: Maybe<Scalars['String']['output']>;
};

/** Represents a tax result of all item data */
export type CalcResultItemsData = {
  __typename?: 'CalcResultItemsData';
  /** Tax details for these items. */
  entries?: Maybe<Array<Maybe<CalcResultEntry>>>;
  /** Total amount of items without taxes in string-decimal format. */
  totalAmount?: Maybe<Scalars['String']['output']>;
  /** Total amount of items taxes in string-decimal format. */
  totalTaxAmount?: Maybe<Scalars['String']['output']>;
  /** Total amount of items with taxes in string-decimal format. */
  totalWithTaxAmount?: Maybe<Scalars['String']['output']>;
};

/** Represents a tax result of shipping data */
export type CalcResultShippingData = {
  __typename?: 'CalcResultShippingData';
  /** Tax details for the shipping. */
  entries?: Maybe<CalcResultEntry>;
  /** Total amount of shipping without taxes in string-decimal format. */
  totalAmount?: Maybe<Scalars['String']['output']>;
  /** Total amount of shipping taxes in string-decimal format. */
  totalTaxAmount?: Maybe<Scalars['String']['output']>;
  /** Total amount of shipping with taxes in string-decimal format. */
  totalWithTaxAmount?: Maybe<Scalars['String']['output']>;
};

/** An input type for associated cart data */
export type CartInput = {
  /** The billing address associated with this cart */
  billingAddress?: InputMaybe<AddressInput>;
  /** The currency of the cart, e.g. USD */
  currency?: InputMaybe<Scalars['String']['input']>;
  /** The customer associated with this cart */
  customer?: InputMaybe<CustomerInput>;
  /** The cart level discounts associated with this cart */
  discounts?: InputMaybe<Array<DiscountInput>>;
  /** The email associated with this cart */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The unique checkout id, used to update an existing checkout */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The items associated with this cart */
  items?: InputMaybe<Array<ItemInput>>;
  /** Merchant metadata associated with this cart */
  metadata?: InputMaybe<Scalars['Map']['input']>;
  /** The payment associated with this cart */
  payment?: InputMaybe<PaymentInput>;
  /** The phone associated with this cart */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The promotions associated with this cart */
  promotions?: InputMaybe<PromotionInput>;
  /** The shipping address associated with this cart */
  shippingAddress?: InputMaybe<AddressInput>;
  /** The shipping method of the cart, e.g. StandardGround */
  shippingMethod?: InputMaybe<Scalars['String']['input']>;
  /** The shipping price of the cart, e.g. 10.00 */
  shippingPrice?: InputMaybe<Scalars['String']['input']>;
  /** The tax rate of the cart, e.g. 0.10 */
  taxRate?: InputMaybe<Scalars['String']['input']>;
  /** The total discounts of the cart, e.g. 0.00 */
  totalDiscounts?: InputMaybe<Scalars['String']['input']>;
  /** The total price of the cart, e.g. 100.00 */
  totalPrice?: InputMaybe<Scalars['String']['input']>;
  /** The sub total price of the cart, e.g. 90.00 */
  totalSubtotalPrice?: InputMaybe<Scalars['String']['input']>;
  /** The total tax of the cart, e.g. 10.00 */
  totalTotalTax?: InputMaybe<Scalars['String']['input']>;
};

/** Checkout represents a cart with associated data such as customer, shipping address, billing address, and payment. It also contains the tax breakdown for the cart. */
export type Checkout = {
  __typename?: 'Checkout';
  /** The billing address associated with this checkout */
  billingAddress?: Maybe<Address>;
  /** When the checkout was created */
  createdAt?: Maybe<Scalars['Time']['output']>;
  /** The currency of the checkout, e.g. USD */
  currency?: Maybe<Scalars['String']['output']>;
  /** The customer associated with this checkout */
  customer?: Maybe<Customer>;
  /** The cart level discounts associated with this checkout */
  discounts: Array<Discount>;
  /** The email associated with this checkout */
  email?: Maybe<Scalars['String']['output']>;
  /** The unique checkout id */
  id: Scalars['UUID']['output'];
  /** The items associated with this checkout */
  items: Array<Item>;
  /** Merchant metadata associated with this checkout */
  metadata?: Maybe<Scalars['Map']['output']>;
  /** When the checkout was last modified */
  modifiedAt?: Maybe<Scalars['Time']['output']>;
  /** The phone associated with this checkout */
  phone?: Maybe<Scalars['String']['output']>;
  /** The promotions associated with this checkout */
  promotions?: Maybe<Promotion>;
  /** The shipping address associated with this checkout */
  shippingAddress?: Maybe<Address>;
  /** The shipping method of the checkout */
  shippingMethod?: Maybe<Scalars['String']['output']>;
  /** The shipping price of the checkout */
  shippingPrice: Money;
  /** The shipping rate associated with this cart */
  shippingRate?: Maybe<ShippingRate>;
  /** The tax breakdown associated with this checkout */
  taxData?: Maybe<CalcResult>;
  /** The tax rate of the checkout */
  taxRate?: Maybe<Scalars['String']['output']>;
  /** The total discounts of the checkout */
  totalDiscounts: Money;
  /** The total price of the checkout */
  totalPrice: Money;
  /** The sub total price of the checkout */
  totalSubtotalPrice: Money;
  /** The total tax of the checkout */
  totalTotalTax: Money;
};

export type CollectionContent = Node & {
  __typename?: 'CollectionContent';
  /** [sys] Reference to collection by Nacelle ID. */
  collectionEntryId: Scalars['ID']['output'];
  /** [source] The Unix timestamp in seconds when the collection content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The description for a collection. */
  description?: Maybe<Scalars['String']['output']>;
  /** [source] The primary media for a collection. */
  featuredMedia?: Maybe<Media>;
  /** [source] Custom fields from a dynamic CMS source. */
  fields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] Reference to collection by handle. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The locale of product collection to be presented. [IETF language tag] (ie. en-US) */
  locale?: Maybe<Scalars['String']['output']>;
  /** [source] List of metafields associated with the product collection. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the collection content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] SEO fields for a collection */
  seo?: Maybe<Seo>;
  /** [source] The ID for the content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The title for a collection. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the collection content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

/** Represents master pieces of content like a page, article, employee, press-release, etc. */
export type Content = Node & {
  __typename?: 'Content';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] Stringified JSON representing custom fields from a dynamic CMS source. */
  fields?: Maybe<Scalars['JSON']['output']>;
  /** [source] Specifies genesis data if exists. */
  genesis?: Maybe<Genesis>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The locale of the content to be presented. [IETF language tag] (ie. en-US) */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] List of tags that have been associated to the content. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  typedFields?: Maybe<ContentTypedFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollection = Node & {
  __typename?: 'ContentCollection';
  /** [source] Localized content associated with the content collection. */
  content?: Maybe<CollectionContent>;
  /** [source] List of content entries with Relay-style pagination */
  contentConnection: ContentConnection;
  /** [source] The Unix timestamp in seconds when the content collection was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /**
   * [source] List of content entries for a given content collection.
   * @deprecated `contentConnection` should be used for paginated content queries.
   */
  entries: Array<Content>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of metafields associated with the content collection. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The ID for the content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] List of tags that have been associated to the collection. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the content collection was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};


/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollectionContentConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc. */
export type ContentCollectionEntriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** Result of a ContentCollection Query with pagination info */
export type ContentCollectionConnection = NodeConnection & {
  __typename?: 'ContentCollectionConnection';
  edges: Array<ContentCollectionEdge>;
  pageInfo: PageInfo;
};

/** Implementation of an Edge type for ContentCollection entries */
export type ContentCollectionEdge = NodeEdge & {
  __typename?: 'ContentCollectionEdge';
  cursor: Scalars['String']['output'];
  node: ContentCollection;
};

/** Filter results for product collection */
export type ContentCollectionFilterInput = {
  /** Returns elements after a cursor nacelleEntryId */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n collections of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Filter content collection entries by entry handle. */
  handles?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter items based on locale. [IETF language tag] (ie. en-US) */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Filter content collection entries by Nacelle entry id. */
  nacelleEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter content collection entries by source entry id. */
  sourceEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Result of a Content Query with pagination info */
export type ContentConnection = NodeConnection & {
  __typename?: 'ContentConnection';
  edges: Array<ContentEdge>;
  /** [source] Returns filtered number of entries for backend search, defaults to null */
  filteredCount?: Maybe<Scalars['Int']['output']>;
  pageInfo: PageInfo;
  /** [source] Returns total number of entries in a collection for collection queries, null for content queries */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Implementation of an Edge type for Content entries */
export type ContentEdge = NodeEdge & {
  __typename?: 'ContentEdge';
  cursor: Scalars['String']['output'];
  node: Content;
};

/** Filter results for content */
export type ContentFilterInput = {
  /** Returns elements after a cursor nacelleEntryId */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Experimental: Filter content entries by audience segment */
  audienceSegment?: InputMaybe<Scalars['String']['input']>;
  /** Determines how many levels of nested content entries should be returned */
  entryDepth?: InputMaybe<Scalars['Int']['input']>;
  /** Returns the first n content entries of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Filter content entries by entry handle. Requires type filter or defaults to type of 'page'. */
  handles?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter items based on locale. [IETF language tag] (ie. en-US) */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Filter content entries by Nacelle entry id. */
  nacelleEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The backend search filter */
  searchFilter?: InputMaybe<ContentSearchOptions>;
  /** Filter content entries by source entry id. */
  sourceEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Experimental: Filter content entries by source id. */
  sourceId?: InputMaybe<Scalars['String']['input']>;
  /** Filter content entries by content type (ie. 'article', 'page', etc.) */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** List of Content ids grouped for a specific purpose. */
export type ContentList = {
  __typename?: 'ContentList';
  ids: Array<Scalars['ID']['output']>;
  listHandle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Searchable fields for content */
export enum ContentSearchFields {
  Handle = 'HANDLE',
  Title = 'TITLE',
  Type = 'TYPE'
}

/** Search options for content */
export type ContentSearchOptions = {
  /** The searchable fields for content */
  fields?: InputMaybe<Array<ContentSearchFields>>;
  /** The field by which to sort by */
  sortField?: InputMaybe<ProductCollectionSearchFields>;
  /** The order by which to sort */
  sortOrder?: InputMaybe<ProductCollectionSortOrder>;
  /** The search term of the entry to search */
  term?: InputMaybe<Scalars['String']['input']>;
};

export type ContentTypedFields = TypedFieldsexampleprojectArticleFields | TypedFieldsexampleprojectAuthorFields | TypedFieldsexampleprojectLinksFields | TypedFieldsexampleprojectPageFields;

/** Represents a customer in the system */
export type Customer = {
  __typename?: 'Customer';
  /** The customers addresses */
  addresses?: Maybe<Array<Maybe<Address>>>;
  /** When the customer was created */
  createdAt?: Maybe<Scalars['Time']['output']>;
  /** The destination id of the customer, used for syncing with external systems */
  destinationExternalID?: Maybe<Scalars['String']['output']>;
  /** The customers email */
  email?: Maybe<Scalars['String']['output']>;
  /** The customers first name */
  firstName?: Maybe<Scalars['String']['output']>;
  /** The unique customer id */
  id: Scalars['UUID']['output'];
  /** The customers last name */
  lastName?: Maybe<Scalars['String']['output']>;
  /** A map of meta data for the customer */
  meta?: Maybe<Scalars['Map']['output']>;
  /** When the customer was last modified */
  modifiedAt?: Maybe<Scalars['Time']['output']>;
  /** The customers phone number */
  phone?: Maybe<Scalars['String']['output']>;
  /** The external id of the source, used for syncing with external systems */
  sourceExternalID?: Maybe<Scalars['String']['output']>;
};

/** An input type for associated customer data */
export type CustomerInput = {
  /** The email of the customer */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the customer */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the customer */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The phone of the customer */
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** Direction to return results in */
export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Discount = {
  __typename?: 'Discount';
  /** The amount that the discount is for */
  amount: Money;
  /** A description about the discount */
  description: Scalars['String']['output'];
  /** The effect type that the discount was for. Used to determine how to apply the discount and how to parse any meta data. */
  effectType: Scalars['String']['output'];
  /** Add meta field for additional props the merchant may want to use to display additional context to the user */
  meta?: Maybe<Scalars['Map']['output']>;
  /** A descriptive name to display to a user */
  name: Scalars['String']['output'];
};

export type DiscountInput = {
  /** The amount that the discount is for */
  amount: Scalars['String']['input'];
  /** A description about the discount */
  description: Scalars['String']['input'];
  /** The effect type that the discount was for. Used to determine how to apply the discount and how to parse any meta data. */
  effectType: Scalars['String']['input'];
  /** Add meta field for additional props the merchant may want to use to display additional context to the user */
  meta?: InputMaybe<Scalars['Map']['input']>;
  /** A descriptive name to display to a user */
  name: Scalars['String']['input'];
};

/** Represents a fulfillment in the system */
export type Fulfillment = {
  __typename?: 'Fulfillment';
  /** External location ID that has been assigned for fulfillment work */
  assignedLocationId?: Maybe<Scalars['String']['output']>;
  /** Timestamp at which the Fulfillment has been delivered (unix timestamp in seconds) */
  deliveryDate?: Maybe<Scalars['Int']['output']>;
  /**
   * Comment describing when delivery expected, received from the shipping company.
   * E.g. "28 July 2023 before 9pm".
   */
  deliveryEstimation?: Maybe<Scalars['String']['output']>;
  /** The type of delivery method */
  deliveryMethod: Scalars['String']['output'];
  /** The type of delivery */
  deliveryType: Scalars['String']['output'];
  /** The destination where the items should be sent */
  destinationAddress?: Maybe<Address>;
  /** The external id for the fulfillment */
  externalId: Scalars['String']['output'];
  /** A list of order item fulfillment data */
  fulfillmentOrderItems?: Maybe<Array<FulfillmentOrderItem>>;
  /** The unique fulfillment id */
  id: Scalars['UUID']['output'];
  /** The nacelle status of the fulfillment */
  nacelle_status: Scalars['FulfillmentStatus']['output'];
  /** The current shipment status of the fulfillment */
  shipmentStatus?: Maybe<Scalars['String']['output']>;
  /** The merchant status of the fulfillment */
  status?: Maybe<Scalars['String']['output']>;
  /** The name of the tracking company */
  trackingCompany?: Maybe<Scalars['String']['output']>;
  /** A list of tracking numbers provided by the shipping company */
  trackingNumbers?: Maybe<Array<Scalars['String']['output']>>;
  /** A list of tracking URLs */
  trackingUrls?: Maybe<Array<Scalars['String']['output']>>;
};

/** An object containing an array of Fulfillment data and pagination information */
export type FulfillmentConnection = {
  __typename?: 'FulfillmentConnection';
  /** An array of FulfillmentsEdge's. */
  edges: Array<Maybe<FulfillmentEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An object containing a node with Fulfillment data and a cursor */
export type FulfillmentEdge = {
  __typename?: 'FulfillmentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['Cursor']['output'];
  /** The order item data */
  node: Fulfillment;
};

/** Filter results for Fulfillment collections */
export type FulfillmentFilter = {
  /** (Optional) A cursor for navigating in forwards through data */
  after?: InputMaybe<Scalars['Cursor']['input']>;
  /** (Optional) A cursor for navigating in backwards through data */
  before?: InputMaybe<Scalars['Cursor']['input']>;
  /** (Optional) What direction the data is retrieved by. */
  direction?: InputMaybe<Direction>;
  /** (Optional) How many records to return. Defaults to 50. Max value of 100 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** (Optional) How the returned rows are ordered either version, or timestamp. */
  orderBy?: InputMaybe<OrderBy>;
};

/** Represents a fulfillment order item data attached to the Fulfillment object. */
export type FulfillmentOrderItem = {
  __typename?: 'FulfillmentOrderItem';
  /** Order Item ID */
  orderItemID: Scalars['UUID']['output'];
  /** Quantity of fulfilled goods for this Order Item */
  quantity: Scalars['Uint']['output'];
};

/** Genesis object indicating which entries map to remixed ones. */
export type Genesis = {
  __typename?: 'Genesis';
  audienceSegment: Scalars['String']['output'];
  originalContentHandle?: Maybe<Scalars['String']['output']>;
  originalContentId: Scalars['String']['output'];
};

/** An item represents a product variant in a cart */
export type Item = {
  __typename?: 'Item';
  /** The available quantity of the item, e.g. 1 */
  available?: Maybe<Scalars['Uint']['output']>;
  /** The item level discounts associated with this checkout */
  discounts: Array<Discount>;
  /** Merchant metadata associated with this item */
  metadata?: Maybe<Scalars['Map']['output']>;
  /** The price of the item */
  price: Money;
  /** The nacelle product ID of the item */
  productID: Scalars['String']['output'];
  /** The positive quantity of the item */
  quantity: Scalars['Uint']['output'];
  /** The sku of the item */
  sku?: Maybe<Scalars['String']['output']>;
  /** The subtotal price of the item */
  subtotalPrice: Money;
  /** The tax of the item */
  tax: Money;
  /** The total amount discounted from this item */
  totalDiscounts: Money;
  /** The nacelle variant ID of the item */
  variantID: Scalars['String']['output'];
};

/** An input type for associated item data */
export type ItemInput = {
  /** The item level discounts associated with this item */
  discounts?: InputMaybe<Array<DiscountInput>>;
  /** Merchant metadata associated with this item */
  metadata?: InputMaybe<Scalars['Map']['input']>;
  /** The price of the item, e.g. 100.00 */
  price?: InputMaybe<Scalars['String']['input']>;
  /** The nacelle product ID of the item */
  productID: Scalars['String']['input'];
  /** The positive quantity of the item, e.g. 1 */
  quantity: Scalars['Uint']['input'];
  /** The sku of the item */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** The subtotal price of the item, e.g. 90.00 */
  subtotalPrice?: InputMaybe<Scalars['String']['input']>;
  /** The tax of the item, e.g. 10.00 */
  tax?: InputMaybe<Scalars['String']['input']>;
  /** The discounts of the item, e.g. 0.00 */
  totalDiscounts?: InputMaybe<Scalars['String']['input']>;
  /** The nacelle variant ID of the item */
  variantID: Scalars['String']['input'];
};

/** A piece of media that can represent an Image, 3dModel, or Video. */
export type Media = {
  __typename?: 'Media';
  altText?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  src: Scalars['String']['output'];
  thumbnailSrc?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

/** Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are comprised of keys, values */
export type Metafield = {
  __typename?: 'Metafield';
  id?: Maybe<Scalars['ID']['output']>;
  key: Scalars['String']['output'];
  namespace?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

/** Represents a single price */
export type Money = {
  __typename?: 'Money';
  /** [source] An amount for the money */
  amount: Scalars['Int']['output'];
  /** [source] A currencyCode identifier for the amount */
  currencyCode: Scalars['String']['output'];
  /** [source] (optional) The precision to which the currency amount should be displayed */
  precisionDigits?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * This mutation will create a checkout session.
   * Returns a new checkout ID.
   */
  createCheckout: Scalars['String']['output'];
  root?: Maybe<Scalars['String']['output']>;
  /** This mutation will update the existing checkout session. */
  updateCheckout: Checkout;
};


export type MutationCreateCheckoutArgs = {
  cart: CartInput;
};


export type MutationUpdateCheckoutArgs = {
  cart: CartInput;
};

/** The filter to apply, when selecting navigation items. */
export type NavigationFilterInput = {
  /** The navigation group to filter by */
  groupId?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationGroup = {
  __typename?: 'NavigationGroup';
  /** Created-at timestamp */
  createdAt?: Maybe<Scalars['String']['output']>;
  /** The unique identifier of the navigation group */
  groupId: Scalars['String']['output'];
  /** Items within a navigation group */
  items?: Maybe<Array<NavigationGroupItem>>;
  /** Navigation properties */
  properties?: Maybe<Array<NavigationPropertyItem>>;
  /** Displayable title of a navigation group */
  title?: Maybe<Scalars['String']['output']>;
  /** Updated-at timestamp */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated-by user ID */
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type NavigationGroupItem = {
  __typename?: 'NavigationGroupItem';
  /** Navigation items */
  items?: Maybe<Array<NavigationGroupItem>>;
  /** Navigation media items */
  media?: Maybe<Array<NavigationMediaItem>>;
  /** Navigation properties */
  properties?: Maybe<Array<NavigationPropertyItem>>;
  /** Displayable title of a navigation item */
  title: Scalars['String']['output'];
  /** Item type */
  type?: Maybe<NavigationPropertyType>;
  /** Route to a navigation item */
  url: Scalars['String']['output'];
};

export type NavigationMediaItem = {
  __typename?: 'NavigationMediaItem';
  /** URL that links to the media item */
  url?: Maybe<Scalars['String']['output']>;
};

export type NavigationPropertyItem = {
  __typename?: 'NavigationPropertyItem';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export enum NavigationPropertyType {
  Blog = 'BLOG',
  Collection = 'COLLECTION',
  External = 'EXTERNAL',
  General = 'GENERAL',
  Page = 'PAGE',
  Product = 'PRODUCT'
}

/** An entry with a Globally Unique ID */
export type Node = {
  /** The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
};

/** An object containing an array of Node data and pagination information */
export type NodeConnection = {
  edges: Array<NodeEdge>;
  pageInfo: PageInfo;
};

/** An object containing a node with Nacelle data and a cursor for pagination and filtering */
export type NodeEdge = {
  cursor: Scalars['String']['output'];
  node: Node;
};

/** Represents a single order in the system */
export type Order = {
  __typename?: 'Order';
  /** The cart level discounts applied to this order */
  appliedDiscounts?: Maybe<Array<Discount>>;
  /** [source] The billing address for the order */
  billingAddress?: Maybe<Address>;
  /** When the order was canceled */
  canceledAt?: Maybe<Scalars['NullTime']['output']>;
  /** The reason the order was canceled */
  canceledReason?: Maybe<Scalars['String']['output']>;
  /** A comment about the order */
  comment?: Maybe<Scalars['String']['output']>;
  /** When the order was created */
  createdAt: Scalars['Time']['output'];
  /** The currency of the order for example USD, CAD, etc. */
  currency?: Maybe<Scalars['String']['output']>;
  /** [source] The customer for the order */
  customer?: Maybe<Customer>;
  deadline?: Maybe<Scalars['Uint']['output']>;
  /** The destination id of the order, used for syncing with external systems */
  destinationExternalId?: Maybe<Scalars['String']['output']>;
  /** [source] The total discounts of the order */
  discounts?: Maybe<Money>;
  /** The email address associated with the customer. */
  email?: Maybe<Scalars['String']['output']>;
  /** [source] A query to get all the fulfillments based on the filter */
  fulfillments: FulfillmentConnection;
  /** The unique order id */
  id: Scalars['UUID']['output'];
  /** [source] A query to get all the order items based on the filter */
  items: OrderItemConnection;
  /** [source] The meta data for the order */
  meta?: Maybe<Scalars['Map']['output']>;
  /** When the order was last modified */
  modifiedAt: Scalars['Time']['output'];
  /** The nacelle entry id of the order */
  nacelleEntryId?: Maybe<Scalars['String']['output']>;
  /** @deprecated use items instead */
  orderItems: Array<Maybe<OrderItem>>;
  /** [source] The payment information for the order */
  payment?: Maybe<Payment>;
  /** @deprecated use payment instead */
  paymentMethod?: Maybe<Scalars['String']['output']>;
  /** @deprecated use payment instead */
  paymentService?: Maybe<Scalars['String']['output']>;
  /** @deprecated use payment instead */
  paymentStatus?: Maybe<Scalars['String']['output']>;
  /** The phone number associated with the customer. */
  phone?: Maybe<Scalars['String']['output']>;
  /** [source] The total price of the order */
  price?: Maybe<Money>;
  /** The promotion associated with this order */
  promotion?: Maybe<Promotion>;
  /** [source] The shipping address for the order */
  shippingAddress?: Maybe<Address>;
  /** The shipping method for the order */
  shippingMethod?: Maybe<Scalars['String']['output']>;
  /** The shipping price of the order */
  shippingPrice?: Maybe<Money>;
  /** The external id of the orders source */
  sourceExternalId?: Maybe<Scalars['String']['output']>;
  /** The status of the order */
  status: Scalars['String']['output'];
  /** [source] The subtotal price of the order */
  subtotalPrice?: Maybe<Money>;
  /** [source] The total tax of the order */
  tax?: Maybe<Money>;
  /** The tax rate of the order in string-decimal format */
  taxRate?: Maybe<Scalars['String']['output']>;
  /** [source] The tax calculation information for the order */
  taxResult?: Maybe<CalcResult>;
  /** @deprecated use discounts instead */
  totalDiscounts?: Maybe<Scalars['Int']['output']>;
  /** @deprecated use price instead */
  totalPrice?: Maybe<Scalars['Int']['output']>;
  /** @deprecated use subtotalPrice instead */
  totalSubtotalPrice?: Maybe<Scalars['Int']['output']>;
  /** @deprecated use tax instead */
  totalTotalTax?: Maybe<Scalars['Int']['output']>;
};


/** Represents a single order in the system */
export type OrderFulfillmentsArgs = {
  filter?: InputMaybe<FulfillmentFilter>;
};


/** Represents a single order in the system */
export type OrderItemsArgs = {
  filter?: InputMaybe<OrderItemFilter>;
};

/** What to order results by in a collection */
export enum OrderBy {
  Createdat = 'CREATEDAT',
  Modifiedat = 'MODIFIEDAT'
}

/** An object containing an array of Order data and pagination information */
export type OrderConnection = {
  __typename?: 'OrderConnection';
  /** An list of edges. */
  edges: Array<Maybe<OrderEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An object containing a node with Order data and a cursor */
export type OrderEdge = {
  __typename?: 'OrderEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['Cursor']['output'];
  /** The item at the end of OrderEdge. */
  node: Order;
};

/** Filter results for Order collections */
export type OrderFilter = {
  /** (Optional) A cursor for navigating in forwards through data */
  after?: InputMaybe<Scalars['Cursor']['input']>;
  /** (Optional) A cursor for navigating in backwards through data */
  before?: InputMaybe<Scalars['Cursor']['input']>;
  /** (Optional) What direction the data is retrieved by. */
  direction?: InputMaybe<Direction>;
  /** (Optional) A timestamp that filters out all events after it, timezone is utc +00:00 */
  end?: InputMaybe<Scalars['Time']['input']>;
  /** (Optional) First denotes how many records to return */
  first?: Scalars['Int']['input'];
  /** (Optional) The order id to filter by */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** (Optional) How the returned rows are ordered either version, or timestamp. */
  orderBy?: InputMaybe<OrderBy>;
  /** (Optional) The string to search for in the order */
  search?: InputMaybe<Scalars['String']['input']>;
  /** (Optional) A timestamp that filters out all events before it, timezone is utc +00:00 */
  start?: InputMaybe<Scalars['Time']['input']>;
  /** (Optional) The status to filter by */
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a single order item in an order */
export type OrderItem = {
  __typename?: 'OrderItem';
  /** The item level discounts applied to this order item */
  appliedDiscounts?: Maybe<Array<Discount>>;
  /** A comment about the order item */
  comment?: Maybe<Scalars['String']['output']>;
  /** When the order item was created */
  createdAt: Scalars['Time']['output'];
  /** @deprecated use meta instead */
  description?: Maybe<Scalars['String']['output']>;
  /** The destination id of the order item, used for syncing with external systems */
  destinationExternalID?: Maybe<Scalars['String']['output']>;
  /** The total discounts of the order item */
  discountsAmount?: Maybe<Money>;
  /** The unique order item id */
  id: Scalars['UUID']['output'];
  /** The meta data for the order item */
  meta?: Maybe<Scalars['Map']['output']>;
  /** @deprecated use productID instead */
  nacelleEntryID?: Maybe<Scalars['String']['output']>;
  /** @deprecated use priceAmount instead */
  price?: Maybe<Scalars['Int']['output']>;
  /** The total price of the order item */
  priceAmount?: Maybe<Money>;
  /** @deprecated use variantID instead */
  productExternalID?: Maybe<Scalars['String']['output']>;
  /** The nacelle entry id of the product this item represents */
  productID?: Maybe<Scalars['String']['output']>;
  /** The total quantity of the order item */
  quantity?: Maybe<Scalars['Uint']['output']>;
  /** The product sku */
  sku?: Maybe<Scalars['String']['output']>;
  /** The external id of the order item */
  sourceExternalID?: Maybe<Scalars['String']['output']>;
  /** The status of the order item */
  status: Scalars['String']['output'];
  /** The subtotal price of the order item */
  subtotalPriceAmount?: Maybe<Money>;
  /** The total tax of the order item */
  taxAmount?: Maybe<Money>;
  /** The tax rate of the order item in string-decimal format */
  taxRate?: Maybe<Scalars['String']['output']>;
  /** The nacelle entery id of the variant this item represents */
  variantID?: Maybe<Scalars['String']['output']>;
};

/** An object containing an array of OrderItem data and pagination information */
export type OrderItemConnection = {
  __typename?: 'OrderItemConnection';
  /** An array of OrderItemsEdge's. */
  edges: Array<Maybe<OrderItemEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An object containing a node with OrderItem data and a cursor */
export type OrderItemEdge = {
  __typename?: 'OrderItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['Cursor']['output'];
  /** The order item data */
  node: OrderItem;
};

/** Filter results for OrderItem collections */
export type OrderItemFilter = {
  /** (Optional) A cursor for navigating in forwards through data */
  after?: InputMaybe<Scalars['Cursor']['input']>;
  /** (Optional) A cursor for navigating in backwards through data */
  before?: InputMaybe<Scalars['Cursor']['input']>;
  /** (Optional) What direction the data is retrieved by. */
  direction?: InputMaybe<Direction>;
  /** (Optional) How many records to return. Defaults to 50. Max value of 100 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** (Optional) How the returned rows are ordered either version, or timestamp. */
  orderBy?: InputMaybe<OrderBy>;
  /** (Optional) Whether to return canceled items */
  showCanceled?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Contains information that can be used to navigate through paginated data, additionally details whether there are more pages to query. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The ending cursor of this request */
  endCursor: Scalars['String']['output'];
  /** Whether there is a next page to view */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there is a previous page to view */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The starting cursor of this request */
  startCursor: Scalars['String']['output'];
};

/** Represents a payment in the system */
export type Payment = {
  __typename?: 'Payment';
  /** @deprecated use amountValue instead */
  amount: Scalars['Int']['output'];
  /** The total price of the payment */
  amountValue?: Maybe<Money>;
  /** @deprecated use cardBrand instead */
  brand?: Maybe<Scalars['String']['output']>;
  /** The brand of the card used for the payment. For example Visa, Mastercard, etc. */
  cardBrand?: Maybe<Scalars['String']['output']>;
  /** The currency of the payment for example USD, CAD, etc. */
  currency: Scalars['String']['output'];
  /** The external id for the payment for example the stripe payment intent id */
  external_id?: Maybe<Scalars['String']['output']>;
  /** The unique payment id */
  id: Scalars['UUID']['output'];
  /** The meta data for the payment */
  payment_data?: Maybe<Scalars['Map']['output']>;
  /** The type of payment. For example credit card, paypal, etc. */
  payment_type?: Maybe<Scalars['String']['output']>;
  /** The payment processor name for the payment. For example Stripe, Paypal, etc. */
  processor_name?: Maybe<Scalars['String']['output']>;
  /** The status of the payment processor */
  processor_status?: Maybe<Scalars['String']['output']>;
  /** The status of the payment */
  status: Scalars['PaymentStatus']['output'];
};

/** An input type for associated payment data */
export type PaymentInput = {
  /** The amount of the payment e.g. 100.00 */
  amount: Scalars['String']['input'];
  /** The brand of the card e.g. visa */
  cardBrand?: InputMaybe<Scalars['String']['input']>;
  /** The currency of the payment e.g. USD */
  currency: Scalars['String']['input'];
  /** The external ID of the payment e.g. the stripe payment intent ID */
  externalID: Scalars['String']['input'];
  /** The payment method ID e.g. the stripe payment method ID */
  paymentMethodID: Scalars['String']['input'];
  /** The payment type e.g. card */
  paymentType?: InputMaybe<Scalars['String']['input']>;
  /** The payment processor name e.g. stripe */
  processorName?: InputMaybe<Scalars['String']['input']>;
  /** The status of the payment processor e.g. succeeded, created */
  processorStatus?: InputMaybe<Scalars['String']['input']>;
  /** The status of the payment */
  status: Scalars['String']['input'];
};

/** A price break definition. */
export type PriceBreak = {
  __typename?: 'PriceBreak';
  /** [source] List of metafields associated with the price break. */
  metafields: Array<Metafield>;
  /** [source] The price associated with this price break. */
  price?: Maybe<Scalars['Decimal']['output']>;
  /** [source] Maximum quantity of variant needed to apply price break. */
  quantityMax?: Maybe<Scalars['Int']['output']>;
  /** [source] Minimum quantity of variant needed to apply price break. */
  quantityMin?: Maybe<Scalars['Int']['output']>;
};

/** A price rule definition. */
export type PriceRule = {
  __typename?: 'PriceRule';
  /** [source] Array of customer segment ids. Unused. */
  availableTo: Array<Scalars['String']['output']>;
  /** [source] The compare at price of the price rule. This can be used to mark a variant as on sale. */
  comparedAtPrice?: Maybe<Scalars['Decimal']['output']>;
  /** [source] Country code associated with this price rule. Distinct from currency code. */
  country?: Maybe<Scalars['String']['output']>;
  /** [source] Identifying handle of price rule if applicable. */
  handle: Scalars['String']['output'];
  /** [source] The id of the source price rule if applicable. */
  id?: Maybe<Scalars['ID']['output']>;
  /** [source] List of metafields associated with the price rule. */
  metafields: Array<Metafield>;
  /** [source] The price associated with this price rule. */
  price: Scalars['Decimal']['output'];
  /** [source] Used for changing a variant's price based on quantity selected. */
  priceBreaks: Array<PriceBreak>;
  /** [source] The currency code for this price rule. */
  priceCurrency: Scalars['String']['output'];
  /** [source] The title of the price rule. */
  title: Scalars['String']['output'];
};

/** Fields available for standalone pricing */
export type Pricing = {
  __typename?: 'Pricing';
  /** [source] List of metafields associated with the pricing */
  metafields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] The Nacelle ID of the entry */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The default price */
  price?: Maybe<Money>;
  /** [source] The shipping price */
  shipping?: Maybe<Money>;
  /** [source] The discounted price */
  strikeThroughPrice?: Maybe<Money>;
  /** [source] The tax amount */
  taxValue?: Maybe<Money>;
  /** [sys] Reference to parent variant by Nacelle ID */
  variantEntryId: Scalars['ID']['output'];
};

/** Filter results for pricing */
export type PricingFilterInput = {
  /** Filter pricing by country code (ISO-3166 alpha-2) */
  countryCode?: InputMaybe<Scalars['String']['input']>;
  /** Filter pricing by currency code (ISO-4217) */
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n products of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A product represents an individual item for sale. Products are often physical, but they don't have to be. For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty). */
export type Product = Node & {
  __typename?: 'Product';
  /** [source] Specifies if at least one product variant is available for sale. */
  availableForSale?: Maybe<Scalars['Boolean']['output']>;
  /** [source] Localized content for the product. */
  content?: Maybe<ProductContent>;
  /** [source] The Unix timestamp in seconds when the product was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of metafields associated with the product. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The categorization for a product, often used for search and filter. */
  productType?: Maybe<Scalars['String']['output']>;
  /** [source] The ID for the product from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] List of tags that have been associated to the product. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the product was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of variants for the product. */
  variants: Array<Variant>;
  /** [source] Vendor name for product. */
  vendor?: Maybe<Scalars['String']['output']>;
};


/** A product represents an individual item for sale. Products are often physical, but they don't have to be. For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty). */
export type ProductVariantsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
};

/** Represents a collection of products. */
export type ProductCollection = Node & {
  __typename?: 'ProductCollection';
  /** [source] Localized content associated with the product collection. */
  content?: Maybe<CollectionContent>;
  /** [source] The Unix timestamp in seconds when the product collection was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of metafields associated with the product collection. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] List of products entries with Relay-style pagination */
  productConnection: ProductConnection;
  /**
   * [source] List of products for a given product collection.
   * @deprecated `productConnection` should be used for paginated product queries.
   */
  products: Array<Product>;
  /** [source] The ID for the content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] List of tags that have been associated to the collection. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the product collection was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};


/** Represents a collection of products. */
export type ProductCollectionProductConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents a collection of products. */
export type ProductCollectionProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** Result of a Content Query with pagination info */
export type ProductCollectionConnection = NodeConnection & {
  __typename?: 'ProductCollectionConnection';
  edges: Array<ProductCollectionEdge>;
  /** [source] Returns filtered number of collections for backend search, defaults to null */
  filteredCount?: Maybe<Scalars['Int']['output']>;
  pageInfo: PageInfo;
  /** [source] Returns total number of collections for backend search, defaults to null */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** Implementation of an Edge type for Content entries */
export type ProductCollectionEdge = NodeEdge & {
  __typename?: 'ProductCollectionEdge';
  cursor: Scalars['String']['output'];
  node: ProductCollection;
};

/** Filter results for product collection */
export type ProductCollectionFilterInput = {
  /** Returns elements after a cursor nacelleEntryId */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n collections of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Filter product collection entries by entry handle. */
  handles?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter items based on locale. [IETF language tag] (ie. en-US) */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Filter product collection entries by Nacelle entry id. */
  nacelleEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** The backend search filter */
  searchFilter?: InputMaybe<ProductCollectionSearchOptions>;
  /** Filter product collection entries by source entry id. */
  sourceEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter content entries by content type (ie. 'article', 'page', etc.) */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Searchable fields for product collection */
export enum ProductCollectionSearchFields {
  Handle = 'HANDLE',
  Tags = 'TAGS',
  Title = 'TITLE'
}

/** Search options for Product Collection */
export type ProductCollectionSearchOptions = {
  /** The searchable fields for product collections */
  fields?: InputMaybe<Array<ProductCollectionSearchFields>>;
  /** The field by which to sort by */
  sortField?: InputMaybe<ProductCollectionSearchFields>;
  /** The order by which to sort */
  sortOrder?: InputMaybe<ProductCollectionSortOrder>;
  /** The search term of the entry to search */
  term?: InputMaybe<Scalars['String']['input']>;
};

/** Order by which to sort */
export enum ProductCollectionSortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Result of a Content Query with pagination info */
export type ProductConnection = NodeConnection & {
  __typename?: 'ProductConnection';
  edges: Array<ProductEdge>;
  /** [source] Returns filtered number of products for backend search, defaults to null */
  filteredCount?: Maybe<Scalars['Int']['output']>;
  pageInfo: PageInfo;
  /** [source] Returns total number of products in a collection for collection queries, null for product queries */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

/** A piece of product content represents the localized version of data points, with more flexibility. */
export type ProductContent = Node & {
  __typename?: 'ProductContent';
  /** [source] The Unix timestamp in seconds when the product content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The description for a product. */
  description?: Maybe<Scalars['String']['output']>;
  /** [source] The primary media for a product. */
  featuredMedia?: Maybe<Media>;
  /** [source] Custom fields from a dynamic CMS source. */
  fields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] Reference to product by handle. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The locale of product content to be presented. [IETF language tag] (ie. en-US) */
  locale?: Maybe<Scalars['String']['output']>;
  /** [source] List of media for a product */
  media: Array<Media>;
  /** [source] List of metafields associated with the product content. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] List of product options. */
  options: Array<ProductOption>;
  /** [sys] Reference to product by Nacelle ID. */
  productEntryId?: Maybe<Scalars['ID']['output']>;
  /** [source] Specifies if the product content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] SEO fields for a product */
  seo?: Maybe<Seo>;
  /** [source] The ID for the product content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The title for a product. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the product content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

/** Implementation of an Edge type for Product entries */
export type ProductEdge = NodeEdge & {
  __typename?: 'ProductEdge';
  cursor: Scalars['String']['output'];
  node: Product;
};

/** Filter results for product */
export type ProductFilterInput = {
  /** Returns elements after a cursor nacelleEntryId */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Returns the first n products of a query. Defaults to 100. Max value of 500 */
  first?: InputMaybe<Scalars['Int']['input']>;
  /** Filter product entries by entry handle. */
  handles?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter items based on locale. [IETF language tag] (ie. en-US) */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Filter product entries by Nacelle entry id. */
  nacelleEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Deprecated. `PricingFilterInput` should be used for filtering Price books. */
  pricingCountryCode?: InputMaybe<Scalars['String']['input']>;
  /** The backend search filter */
  searchFilter?: InputMaybe<ProductSearchOptions>;
  /** Filter product entries by source entry id. */
  sourceEntryIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** List of Product ids grouped for a specific purpose. */
export type ProductList = {
  __typename?: 'ProductList';
  ids: Array<Scalars['ID']['output']>;
  listHandle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Product property names like Size, Color, and Material that the customers can select. Variants are selected based on permutations of these options. */
export type ProductOption = {
  __typename?: 'ProductOption';
  name: Scalars['String']['output'];
  values: Array<Scalars['String']['output']>;
};

/** Searchable fields for product */
export enum ProductSearchFields {
  Handle = 'HANDLE',
  Sku = 'SKU',
  Tags = 'TAGS',
  Title = 'TITLE'
}

/** Search options for product */
export type ProductSearchOptions = {
  /** The searchable fields for product */
  fields?: InputMaybe<Array<ProductSearchFields>>;
  /** The field by which to sort by */
  sortField?: InputMaybe<ProductCollectionSearchFields>;
  /** The order by which to sort */
  sortOrder?: InputMaybe<ProductCollectionSortOrder>;
  /** The search term of the entry to search */
  term?: InputMaybe<Scalars['String']['input']>;
};

export type Promotion = {
  __typename?: 'Promotion';
  /** Any coupon codes entered. */
  couponCodes?: Maybe<Array<Scalars['String']['output']>>;
  /** Session custom identifiers that you can set limits on or use inside your rules. Such as the users IP address. */
  identifiers?: Maybe<Array<Scalars['String']['output']>>;
  /** Any loyalty cards used. */
  loyaltyCard?: Maybe<Scalars['String']['output']>;
  /** Add meta fields to allow tracking additional data for promotion systems such as customer profile ids */
  meta?: Maybe<Scalars['Map']['output']>;
  /** ID of the customer profile set by your integration layer. */
  profileId?: Maybe<Scalars['String']['output']>;
  /** Any referral code entered. */
  referralCode?: Maybe<Scalars['String']['output']>;
};

export type PromotionInput = {
  /** Any coupon codes entered. */
  couponCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Session custom identifiers that you can set limits on or use inside your rules. Such as the users IP address. */
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Any loyalty cards used. */
  loyaltyCard?: InputMaybe<Scalars['String']['input']>;
  /** Add meta fields to allow tracking additional data for promotion systems such as customer profile ids */
  meta?: InputMaybe<Scalars['Map']['input']>;
  /** ID of the customer profile set by your integration layer. */
  profileId?: InputMaybe<Scalars['String']['input']>;
  /** Any referral code entered. */
  referralCode?: InputMaybe<Scalars['String']['input']>;
};

/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type Query = {
  __typename?: 'Query';
  _service: _Service;
  /** Query a list of content entries with Relay-style pagination */
  allContent: ContentConnection;
  /**
   * Query a list of content collection entries with Relay-style pagination
   * @deprecated `allContent` should be used for paginated content queries.
   */
  allContentCollections: ContentCollectionConnection;
  /** Query a list of ProductCollection entries with Relay-style pagination */
  allProductCollections: ProductCollectionConnection;
  /** Query a list of products entries with Relay-style pagination */
  allProducts: ProductConnection;
  /**
   * Query a list of content entries.
   * @deprecated `allContent` should be used for paginated content queries.
   */
  content: Array<Content>;
  /**
   * Query a collection of contents
   * @deprecated `allContent` should be used for paginated content queries.
   */
  contentCollections: Array<ContentCollection>;
  /** This query will return the customer. */
  customer?: Maybe<Customer>;
  /** This query will return a checkout. */
  getCheckout: Checkout;
  /** This query will return a list of available shipping rates. */
  getShippingRates: ShippingRates;
  /** Get navigation groups for a space */
  navigation: Array<NavigationGroup>;
  /** This query will return a single order given its id. */
  order?: Maybe<Order>;
  /** This query will return a orders for a customer. */
  orders: OrderConnection;
  /**
   * Query a collection of products
   * @deprecated `allProductCollections` should be used for paginated product collection queries.
   */
  productCollections: Array<ProductCollection>;
  /**
   * Query a list of products.
   * @deprecated `allProducts` should be used for paginated product queries.
   */
  products: Array<Product>;
  root?: Maybe<Scalars['String']['output']>;
  /** Space properties data for a space */
  spaceProperties: SpaceProperties;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryAllContentArgs = {
  filter?: InputMaybe<ContentFilterInput>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryAllContentCollectionsArgs = {
  filter?: InputMaybe<ContentCollectionFilterInput>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryAllProductCollectionsArgs = {
  filter?: InputMaybe<ProductCollectionFilterInput>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryAllProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryContentArgs = {
  filter?: InputMaybe<ContentFilterInput>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryContentCollectionsArgs = {
  filter?: InputMaybe<ContentCollectionFilterInput>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryGetCheckoutArgs = {
  checkoutID: Scalars['ID']['input'];
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryGetShippingRatesArgs = {
  address: AddressInput;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryNavigationArgs = {
  filter?: InputMaybe<NavigationFilterInput>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryOrderArgs = {
  id: Scalars['UUID']['input'];
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryOrdersArgs = {
  filter?: InputMaybe<OrderFilter>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryProductCollectionsArgs = {
  filter?: InputMaybe<ProductCollectionFilterInput>;
};


/** The query root. These queries are authenticated and will return data based on the customer associated with the authentication token. */
export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
};

/** A simple response indicating that an indexing event was received. Processing will occur in the background. */
export type QueryResponse = {
  __typename?: 'QueryResponse';
  message: Scalars['String']['output'];
};

/** A field used to provide SEO data for web crawlers */
export type Seo = {
  __typename?: 'SEO';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** Properties used by customers to select a product variant. Products can have multiple options, like different sizes or colors. */
export type SelectedOption = {
  __typename?: 'SelectedOption';
  label?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

/** ShippingRate represents a shipping rate option for the cart */
export type ShippingRate = {
  __typename?: 'ShippingRate';
  /** Price of the shipping rate in string-decimal format, e.g. 10.25 */
  amount: Scalars['String']['output'];
  /** Currency code in ISO 4217 three-letter format, e.g. USD */
  currency: Scalars['String']['output'];
  /** Value of the upper bound of the estimated range. If empty, represents no upper bound, e.g. 10 */
  deliveryEstimateMax?: Maybe<Scalars['Uint']['output']>;
  /** Value of the lower bound of the estimated range. If empty, represents no lower bound, e.g. 2 */
  deliveryEstimateMin?: Maybe<Scalars['Uint']['output']>;
  /** Unit of the delivery estimated range, e.g. hour / day / business_day / week / month */
  deliveryEstimateUnit?: Maybe<Scalars['String']['output']>;
  /** Detailed description of the shipping rate, e.g. Ship orders within the U.S. that need to arrive in the afternoon of the next business day. */
  description?: Maybe<Scalars['String']['output']>;
  /** The display name of the shipping rate, e.g. Ground shipping */
  displayName: Scalars['String']['output'];
  /** External (non-nacelle) id of the ShippingRate object from the ShippingRate API service. */
  externalID: Scalars['String']['output'];
  /** Name of the shipping company, e.g. UPS */
  serviceName?: Maybe<Scalars['String']['output']>;
  /** Describes if shipping rate price includes taxes, e.g. unspecified / inclusive / exclusive */
  taxBehavior: Scalars['String']['output'];
};

/** ShippingRates result. */
export type ShippingRates = {
  __typename?: 'ShippingRates';
  /** List of available shipping rates for specific Address. */
  rates?: Maybe<Array<ShippingRate>>;
};

export type SpaceProperties = {
  __typename?: 'SpaceProperties';
  /** List of space properties grouped by namespace */
  properties?: Maybe<Array<Maybe<SpacePropertyNamespace>>>;
  /** Updated-at timestamp */
  updatedAt?: Maybe<Scalars['String']['output']>;
  /** Updated-by user ID */
  updatedBy?: Maybe<Scalars['String']['output']>;
};

export type SpacePropertyItem = {
  __typename?: 'SpacePropertyItem';
  /** Property name */
  key: Scalars['String']['output'];
  /** Property value */
  value: Scalars['String']['output'];
};

export type SpacePropertyNamespace = {
  __typename?: 'SpacePropertyNamespace';
  /** List of space properties items */
  items?: Maybe<Array<Maybe<SpacePropertyItem>>>;
  /** Namespace name */
  namespace?: Maybe<Scalars['String']['output']>;
};

export type TypedFieldsexampleprojectArticle = Node & {
  __typename?: 'TypedFieldsexampleprojectArticle';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The Unix timestamp in seconds when the content was created. */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin. */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  /** [source] Fields defined by the content model. */
  typedFields?: Maybe<TypedFieldsexampleprojectArticleFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type TypedFieldsexampleprojectArticleFields = {
  __typename?: 'TypedFieldsexampleprojectArticleFields';
  author?: Maybe<TypedFieldsexampleprojectAuthor>;
  haiku?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type TypedFieldsexampleprojectAuthor = Node & {
  __typename?: 'TypedFieldsexampleprojectAuthor';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The Unix timestamp in seconds when the content was created. */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin. */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  /** [source] Fields defined by the content model. */
  typedFields?: Maybe<TypedFieldsexampleprojectAuthorFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type TypedFieldsexampleprojectAuthorFields = {
  __typename?: 'TypedFieldsexampleprojectAuthorFields';
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
};

export type TypedFieldsexampleprojectLinks = Node & {
  __typename?: 'TypedFieldsexampleprojectLinks';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The Unix timestamp in seconds when the content was created. */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin. */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  /** [source] Fields defined by the content model. */
  typedFields?: Maybe<TypedFieldsexampleprojectLinksFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type TypedFieldsexampleprojectLinksFields = {
  __typename?: 'TypedFieldsexampleprojectLinksFields';
  links?: Maybe<TypedFieldsexampleprojectLinksFieldsLinksConnection>;
  title?: Maybe<Scalars['String']['output']>;
};


export type TypedFieldsexampleprojectLinksFieldsLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** A content connection with pagination info */
export type TypedFieldsexampleprojectLinksFieldsLinksConnection = {
  __typename?: 'TypedFieldsexampleprojectLinksFieldsLinksConnection';
  edges: Array<TypedFieldsexampleprojectLinksFieldsLinksEdge>;
  pageInfo: TypedFieldsexampleprojectPageInfo;
};

/** A content connection edge */
export type TypedFieldsexampleprojectLinksFieldsLinksEdge = {
  __typename?: 'TypedFieldsexampleprojectLinksFieldsLinksEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<TypedFieldsexampleprojectPage>;
};

export type TypedFieldsexampleprojectPage = Node & {
  __typename?: 'TypedFieldsexampleprojectPage';
  /** [source] The Unix timestamp in seconds when the content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] A human-friendly unique string for the content. */
  handle?: Maybe<Scalars['String']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The Unix timestamp in seconds when the content was created. */
  locale?: Maybe<Scalars['String']['output']>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] Specifies if the content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The ID for the content from its system of origin. */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  tags: Array<Scalars['String']['output']>;
  /** [source] The title for the content. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The categorization for the content, often used for search and filter. */
  type?: Maybe<Scalars['String']['output']>;
  /** [source] Fields defined by the content model. */
  typedFields?: Maybe<TypedFieldsexampleprojectPageFields>;
  /** [source] The Unix timestamp in seconds when the content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
};

export type TypedFieldsexampleprojectPageFields = {
  __typename?: 'TypedFieldsexampleprojectPageFields';
  handle?: Maybe<Scalars['String']['output']>;
  sections?: Maybe<TypedFieldsexampleprojectPageFieldsSectionsConnection>;
  title?: Maybe<Scalars['String']['output']>;
};


export type TypedFieldsexampleprojectPageFieldsSectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type TypedFieldsexampleprojectPageFieldsSections = TypedFieldsexampleprojectArticle | TypedFieldsexampleprojectLinks;

/** A content connection with pagination info */
export type TypedFieldsexampleprojectPageFieldsSectionsConnection = {
  __typename?: 'TypedFieldsexampleprojectPageFieldsSectionsConnection';
  edges: Array<TypedFieldsexampleprojectPageFieldsSectionsEdge>;
  pageInfo: TypedFieldsexampleprojectPageInfo;
};

/** A content connection edge */
export type TypedFieldsexampleprojectPageFieldsSectionsEdge = {
  __typename?: 'TypedFieldsexampleprojectPageFieldsSectionsEdge';
  cursor?: Maybe<Scalars['String']['output']>;
  node?: Maybe<TypedFieldsexampleprojectPageFieldsSections>;
};

/** Pagination object indicating if there are more pages of data and where the next page starts. */
export type TypedFieldsexampleprojectPageInfo = {
  __typename?: 'TypedFieldsexampleprojectPageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type Variant = Node & {
  __typename?: 'Variant';
  /** [source] Specifies if the variant is available for sale. */
  availableForSale?: Maybe<Scalars['Boolean']['output']>;
  /** [source] The compare at price of the variant. This can be used to mark a variant as on sale. */
  compareAtPrice?: Maybe<Scalars['Decimal']['output']>;
  /** [source] Localized content for the variant. */
  content?: Maybe<VariantContent>;
  /** [source] The Unix timestamp in seconds when the variant was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] List of metafields associated with the variant. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [source] The price of the variant. */
  price?: Maybe<Scalars['Decimal']['output']>;
  /** [source] The currency of the variant price. */
  priceCurrency?: Maybe<Scalars['String']['output']>;
  /** [source] List of pricing rules associated with the variant */
  priceRules: Array<PriceRule>;
  /** [source] standalone pricing */
  pricing?: Maybe<Array<Maybe<Pricing>>>;
  /** [sys] Reference to parent product by Nacelle ID. */
  productEntryId?: Maybe<Scalars['ID']['output']>;
  /** [sys] Reference to parent product by handle. */
  productHandle?: Maybe<Scalars['String']['output']>;
  /** [source] The total sellable quantity of the variant for online sales channels. */
  quantityAvailable?: Maybe<Scalars['Int']['output']>;
  /** [source] The SKU (stock keeping unit) associated with the variant. */
  sku?: Maybe<Scalars['String']['output']>;
  /** [source] The ID for the product variant from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] The Unix timestamp in seconds when the variant was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The variant sort position. */
  variantPosition?: Maybe<Scalars['Int']['output']>;
  /** [source] The weight of the variant in the unit specified with weightUnit. */
  weight?: Maybe<Scalars['Float']['output']>;
  /** [source] The unit of measurement for weight. */
  weightUnit?: Maybe<Scalars['String']['output']>;
};


/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type VariantPricingArgs = {
  filter?: InputMaybe<PricingFilterInput>;
};

/** A piece of variant content represents the localized version of data points, with more flexibility. */
export type VariantContent = Node & {
  __typename?: 'VariantContent';
  /** [source] The Unix timestamp in seconds when the variant content was created. */
  createdAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The description for a variant. */
  description?: Maybe<Scalars['String']['output']>;
  /** [source] The primary media for a variant. */
  featuredMedia?: Maybe<Media>;
  /** [source] Custom fields from a dynamic CMS source. */
  fields?: Maybe<Scalars['JSON']['output']>;
  /** [sys] Timestamp of when Nacelle last indexed this entry. */
  indexedAt?: Maybe<Scalars['Int']['output']>;
  /** [source] The locale of variant content to be presented. [IETF language tag] (ie. en-US) */
  locale?: Maybe<Scalars['String']['output']>;
  /** [source] List of media for a variant */
  media: Array<Media>;
  /** [source] List of metafields associated with the variant content. */
  metafields: Array<Metafield>;
  /** [sys] The Nacelle ID of the entry. */
  nacelleEntryId: Scalars['ID']['output'];
  /** [sys] Reference to parent product by Nacelle ID. */
  productEntryId?: Maybe<Scalars['ID']['output']>;
  /** [sys] Reference to parent product by handle. */
  productHandle?: Maybe<Scalars['String']['output']>;
  /** [source] Specifies if the variant content has been published. */
  published?: Maybe<Scalars['Boolean']['output']>;
  /** [source] List of product options applied to the variant. */
  selectedOptions: Array<SelectedOption>;
  /** [source] The ID for the variant content from its system of origin (i.e. Shopify). */
  sourceEntryId: Scalars['ID']['output'];
  /** [source] The ID for the system of origin. */
  sourceId: Scalars['ID']['output'];
  /** [source] Source url of variant swatch. */
  swatchSrc?: Maybe<Scalars['String']['output']>;
  /** [source] The title for a variant. */
  title?: Maybe<Scalars['String']['output']>;
  /** [source] The Unix timestamp in seconds when the variant content was last modified. */
  updatedAt?: Maybe<Scalars['Int']['output']>;
  /** [sys] Reference to parent variant by Nacelle ID. */
  variantEntryId?: Maybe<Scalars['ID']['output']>;
};

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']['output']>;
};

export type ContentRoutesQueryVariables = Exact<{ [key: string]: never; }>;


export type ContentRoutesQuery = { __typename?: 'Query', pages: { __typename?: 'ContentConnection', edges: Array<{ __typename?: 'ContentEdge', node: { __typename?: 'Content', handle?: string | null } }> } };

export type AllContentQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type AllContentQuery = { __typename?: 'Query', allContent: { __typename?: 'ContentConnection', edges: Array<{ __typename?: 'ContentEdge', node: { __typename?: 'Content', handle?: string | null, nacelleEntryId: string, typedFields?: { __typename?: 'TypedFieldsexampleprojectArticleFields' } | { __typename?: 'TypedFieldsexampleprojectAuthorFields' } | { __typename?: 'TypedFieldsexampleprojectLinksFields' } | { __typename: 'TypedFieldsexampleprojectPageFields', handle?: string | null, title?: string | null, sections?: { __typename?: 'TypedFieldsexampleprojectPageFieldsSectionsConnection', edges: Array<{ __typename?: 'TypedFieldsexampleprojectPageFieldsSectionsEdge', node?: { __typename?: 'TypedFieldsexampleprojectArticle', typedFields?: { __typename: 'TypedFieldsexampleprojectArticleFields', haiku?: string | null, title?: string | null, author?: { __typename?: 'TypedFieldsexampleprojectAuthor', typedFields?: { __typename?: 'TypedFieldsexampleprojectAuthorFields', firstName?: string | null, lastName?: string | null } | null } | null } | null } | { __typename?: 'TypedFieldsexampleprojectLinks', typedFields?: { __typename: 'TypedFieldsexampleprojectLinksFields', links?: { __typename?: 'TypedFieldsexampleprojectLinksFieldsLinksConnection', edges: Array<{ __typename?: 'TypedFieldsexampleprojectLinksFieldsLinksEdge', node?: { __typename?: 'TypedFieldsexampleprojectPage', typedFields?: { __typename?: 'TypedFieldsexampleprojectPageFields', handle?: string | null } | null } | null }> } | null } | null } | null }> } | null } | null } }> } };


export const ContentRoutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContentRoutes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"pages"},"name":{"kind":"Name","value":"allContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"page","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ContentRoutesQuery, ContentRoutesQueryVariables>;
export const AllContentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allContent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allContent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"page","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"handles"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"handle"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"nacelleEntryId"}},{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsexampleprojectPageFields"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsexampleprojectArticle"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"haiku"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TypedFieldsexampleprojectLinks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"typedFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllContentQuery, AllContentQueryVariables>;