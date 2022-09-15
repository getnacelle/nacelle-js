import { CartLine, NacelleCartLine } from '../types/cart.type';

export default function (shopifyLines: CartLine[]): NacelleCartLine[] {
  return shopifyLines?.map((shopifyLine) => {
    const transformedLine: CartLine = { ...shopifyLine };
    const nacelleEntryId = transformedLine.nacelleEntryId?.value as string;
    delete transformedLine.nacelleEntryId;
    return {
      ...transformedLine,
      merchandise: {
        ...transformedLine.merchandise,
        nacelleEntryId
      }
    };
  });
}
