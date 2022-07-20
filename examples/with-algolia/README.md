# With Algolia

## What is Algolia?

Algolia is a search and discovery platform that makes it incredibly simple to add rich search experiences to your ecommerce store. Algolia offers sorting and filtering refinements, synonyms, and many other features to create exactly the search experience you are envisioning. For more information about Algolia and its features, check out the [docs](https://algolia.com/docs).

## How does it work?

In order for Algolia to get the data it needs to function, we must index each item.

It is important to note that it is not necessary to send your complete product or content objects to Algolia. In fact, they recommend only sending what you need to perform searches and filtering operations and enforce object size limits. This ensures your index stays as perfomant as possible.

 Algolia provides an easy to use library for persisting items in its index.

```javascript
import algolia from ('algoliasearch')

const client = algolia('YourApplicationID', 'YourAdminAPIKey')
const index = client.initIndex('your_index_name')

const objects = [
  {
    objectID: 1,
    title: 'Product 1',
  },
]

index
  .saveObjects(objects)
  .then(({ objectIDs }) => {
    console.log(objectIDs)
  })
  .catch((err) => {
    console.log(err)
  })
```

## What is in this example?
This example demonstrates how you can set up an AWS Lambda function using the Serverless Framework and TypeScript to create an endpoint that can be run on a schedule or at-will, in order to index items in Algolia.

## What about the frontend?

Using the same library as above, we can search our Algolia index:

```javascript
index
  .search('Product 1')
  .then(({ hits }) => {
    console.log(hits) 
  })
  .catch((err) => {
    console.log(err)
  })
```

Algolia also provides libraries to easily build search UIs, however you may not need to reach for them. 

Check out this implementation using a simple input field and basic product grid using Nuxt 2:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/nuxt-starter-u2ugun?file=pages/index.vue)
