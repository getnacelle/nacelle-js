import { Storefront } from '@nacelle/storefront-sdk'
export const useCart = () => {
  const token = '493dd23a-8644-4267-a1ae-be037417496e'
  const storefrontEndpoint =
    'https://storefront.api.development.nacelle.com/graphql/v1/spaces/e221faf8-49ca-4ba8-ae01-096fe1c639ff'

  // initialize the Nacelle Storefront SDK
  //@ts-ignore
  const client = new Storefront({
    token,
    storefrontEndpoint,
    subscriptionEndpoint:
      'wss://subscriptions.api.development.nacelle.com/subscribe/spaces/e221faf8-49ca-4ba8-ae01-096fe1c639ff',
    subscriptionToken: 'ebef028d-e265-441c-b23e-267890ae1a74',
  })

  const cart = useState('cart', () => [])

  const cartUiState = useState('cartUiState', () => 'closed')

  const openCart = () => {
    cartUiState.value = 'open'
  }

  const closeCart = () => {
    cartUiState.value = 'closed'
  }

  const temporarilyOpenCart = () => {
    openCart()
    setTimeout(() => {
      closeCart()
    }, 5000)
  }

  const addItem = (item) => {
    cart.value.push(item)
    temporarilyOpenCart()
  }

  const removeItem = (id) => {
    cart.value = cart.value.filter((i) => i.nacelleEntryId !== id)
    if (cart.value.length === 0) {
      closeCart()
    }
  }

  const clear = () => {
    cart.value = []
  }

  const updateItemAvailability = (data) => {
    // find the item that matches the event
    const index = cart.value.findIndex(
      (item) => item.nacelleEntryId === data.nacelleEntryId
    )

    // set the item's stock status based on the event data
    const itemToUpdate = cart.value[index]
    itemToUpdate.availableForSale = data.availableForSale
  }

  const itemEntryIds = computed(() => {
    return cart.value.map((variant) => variant.nacelleEntryId)
  })

  const itemOutOfStock = computed(() => {
    return cart.value.some((item) => !item.availableForSale)
  })

  return {
    cart,
    cartUiState,
    openCart,
    closeCart,
    addItem,
    removeItem,
    clear,
    updateItemAvailability,
    itemOutOfStock,
  }
}
