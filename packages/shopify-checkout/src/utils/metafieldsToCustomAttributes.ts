import { Attribute, Metafield } from '../checkout-client.types';

export interface ReconcileCustomAttributesParams {
  metafields?: Metafield[];
}

/**
 * Given either `customAttributes` or `metafields`, return `customAttributes`.
 *
 * If `customAttributes` are provided, `metafields` will be ignored.
 */
export default function metafieldsToCustomAttributes({
  metafields
}: ReconcileCustomAttributesParams): Attribute[] {
  if (!Array.isArray(metafields) || !metafields?.length) {
    return [];
  }

  const customAttributes: Attribute[] = metafields?.reduce((fields, m) => {
    if (typeof m.value === 'string') {
      fields.push({ key: m.key, value: m.value });
    } else {
      console.warn(
        `Omitting custom attribute "${m.key}" because it has a non-string value.`
      );
    }

    return fields;
  }, [] as Attribute[]);

  return customAttributes;
}
