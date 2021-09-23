import { Metafield } from '@nacelle/types';
import { Attribute } from '~/checkout-client.types';

export interface ReconcileCustomAttributesParams {
  customAttributes?: Attribute[];
  metafields?: Metafield[];
}

/**
 * Given either `customAttributes` or `metafields`, return `customAttributes`.
 *
 * If `customAttributes` are provided, `metafields` will be ignored.
 *
 * @export
 * @param {ReconcileCustomAttributesParams} params
 * @return {*}  {Attribute[]}
 */
export default function reconcileCustomAttributes(
  params: ReconcileCustomAttributesParams
): Attribute[] {
  let customAttributes: Attribute[] = [];

  if (params.customAttributes?.length) {
    customAttributes = params.customAttributes;
  } else if (params.metafields?.length) {
    customAttributes = params.metafields.reduce((fields, input) => {
      const { key, value } = input;

      if (key && value) {
        fields.push({ key, value });
      }

      return fields;
    }, [] as Attribute[]);
  }

  return customAttributes;
}
