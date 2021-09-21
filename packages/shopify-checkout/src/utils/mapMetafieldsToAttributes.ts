import { Attribute, Metafield } from '~/checkout-client.types';

export default function mapMetafieldsToAttributes(
  metafields: Metafield[]
): Attribute[] {
  return metafields.reduce((fields, input) => {
    const { key, value } = input;

    if (key && value) {
      fields.push({ key, value });
    }

    return fields;
  }, [] as Attribute[]);
}
