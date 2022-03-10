# Flash Sale

A flash sale is a discount or promotion that is only available for a limited time. In this example, the flash sale is represented by a countdown timer on the collection page. The details around product pricing discounts will happen in the PIM, while content and messaging can be set up in the CMS.

This example uses the Nacelle Next.js Starter. While the code is written for React and Next.js, the concepts can be applied to any Javascript project. To learn more about this starter and others like it, check out https://github.com/getnacelle/nacelle-js for more information.

## Modeling Content

The following fields are a good starting point when setting up flash sale content in the CMS:

- End Date - A date to define when the sale is no longer active.
- Identifier - A means to determine which product or collection the flash sale should appear. This could be a handle, tag, or an other field from the PIM.

Consider adding additional fields to improve the flash sale, such as messaging that appears to promote the sale or a start date so that the sale can be prepared ahead of time.

## Querying Content

In this example, the [Nacelle Storefront SDK](https://www.npmjs.com/package/@nacelle/storefront-sdk) is used to create a custom query for the flash sale content. The flash sales content has a type of "flashSale" which is used to filter the query. The `fields` field will contain all the data that was entered into the CMS.

Excerpt from `pages/collections/[handle].js`:

```gql
flashSales: content(filter: { type: "flashSale" }){
  fields
}
```

From the results of this query the flash sales are checked for a matching identifier, in this case a collection handle, and if the end date has not yet passed. The active flash sale is then returned as a prop.

Excerpt from `pages/collections/[handle].js`:

```js
const flashSale = flashSales.find((flashSale) => {
  if (
    params.handle !== flashSale.fields.collectionHandle ||
    !flashSale.fields.endDate
  ) {
    return false;
  }
  const now = Date.now();
  const endDate = new Date(flashSale.fields.endDate);
  if (now > endDate) return false;
  return true;
});
```

## Displaying the Flash Sale Countdown

In this example, [`react-countdown`](https://www.npmjs.com/package/react-countdown) is used to create a countdown timer. This timer counts down to the flash sale's specified end date. This can be seen in `pages/collections/[handle].js`. For Vue, an alternative to consider is [`vue-countdown`](https://www.npmjs.com/package/@chenfengyuan/vue-countdown).

```js
let flashSaleText = false;
const flashSaleRenderer = (timeDelta) => {
  const formattedDate = formatTimeDelta(timeDelta, {
    daysInHours: true
  });
  const { hours, minutes, seconds, completed } = formattedDate;
  if (completed) {
    return <></>;
  } else {
    return (
      <p suppressHydrationWarning>
        <strong>Sale Ends</strong> {zeroPad(hours)}:{zeroPad(minutes)}:
        {zeroPad(seconds)}
      </p>
    );
  }
};
if (flashSale?.fields?.endDate) {
  const now = Date.now();
  const endDate = new Date(flashSale.fields.endDate);
  if (now < endDate) {
    flashSaleText = <Countdown date={endDate} renderer={flashSaleRenderer} />;
  }
}
```
