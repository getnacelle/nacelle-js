import { Variant } from '@nacelle/storefront-sdk'
import { Ref } from 'nuxt/dist/app/compat/capi'

export const useVariants = (vars) => {
  const variants = ref(vars.value.variants) as Ref<Variant[]>

  // the currently selected variant
  const selectedVariant = ref(null)

  // sets the selected variant to the one that is passed in, as long as it is available for sale
  const setSelectedVariant = (variant: Variant) => {
    variant && variant.availableForSale
      ? (selectedVariant.value = variant)
      : (selectedVariant.value = null)
  }

  // specifies the order of size options
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']

  // sorts the variant selectors by the previously set sizeOrder
  const sortVariants = () => {
    variants.value = variants.value.sort((a, b) => {
      const aSize = a.content.selectedOptions.find((o) => o.name === 'Size')
      const bSize = b.content.selectedOptions.find((o) => o.name === 'Size')
      return sizeOrder.indexOf(aSize.value) - sizeOrder.indexOf(bSize.value)
    })
  }

  //finds the next available variant and sets it as selected, othwerwise sets the selected as null
  const setNextAvailableVariant = () => {
    const nextAvailableVariant = variants.value.find((v) => v.availableForSale)

    nextAvailableVariant
      ? setSelectedVariant(nextAvailableVariant)
      : setSelectedVariant(null)
  }

  // returns variant entry ids for usage with inventory availability in Nacelle Streams
  const variantEntryIds = computed(() => {
    return variants.value.map((variant) => variant.nacelleEntryId)
  })

  // returns true or false if at least one variant is available for sale
  const atLeastOneVariantAvailable = computed(() => {
    return variants.value.some((variant) => variant.availableForSale)
  })

  // updates a variant's availability based on messages from Nacelle Streams
  const updateVariantAvailability = (data) => {
    // find the variant that matches the event
    const index = variants.value.findIndex(
      (variant) => variant.nacelleEntryId === data.nacelleEntryId
    )

    // set the variant's stock status based on the event data
    const variantToUpdate = variants.value[index]
    variantToUpdate.availableForSale = data.availableForSale

    // if the variant is now out of stock but is currently selected, set the next available variant. otherwise, set the selected variant to null
    !variantToUpdate.availableForSale &&
    variantToUpdate.nacelleEntryId == selectedVariant.value.nacelleEntryId
      ? setNextAvailableVariant()
      : null
  }

  return {
    variants,
    selectedVariant,
    variantEntryIds,
    atLeastOneVariantAvailable,
    setSelectedVariant,
    sortVariants,
    updateVariantAvailability,
    setNextAvailableVariant,
  }
}
