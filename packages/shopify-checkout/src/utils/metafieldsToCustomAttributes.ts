import { Metafield } from '@nacelle/types';
import { Attribute } from '~/checkout-client.types';

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
  let customAttributes: Attribute[] = [];

  if (metafields?.length) {
    customAttributes = metafields?.reduce((fields, input) => {
      const { key, value } = input;

      if (key && value) {
        fields.push({ key, value });
      }

      return fields;
    }, [] as Attribute[]);
  }

  return customAttributes;
}