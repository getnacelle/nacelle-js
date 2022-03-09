<script>
import { get as getCookie } from 'es-cookie'

import { ref, inject, onMounted } from 'vue'
import AddressItem from './AddressItem.vue'
import AddressForm from './AddressForm.vue'

export default {
  name: 'Addresses',
  components: { AddressItem, AddressForm },
  setup() {
    const customerAccessToken = inject('customerAccessToken')
    const userErrors = inject('userErrors')
    const defaultAddress = inject('defaultAddress')
    const addresses = inject('addresses')
    const fetchAddresses = inject('fetchAddresses')
    const readCustomerAccessToken = inject('readCustomerAccessToken')

    const isEditing = ref(false)
    const addressesLoaded = ref(false)

    onMounted(async () => {
      addressesLoaded.value = false
      const accessToken = getCookie('customerAccessToken')
      await readCustomerAccessToken({ accessToken })
      if (customerAccessToken.value) {
        await fetchAddresses()
      }
      addressesLoaded.value = true
    })

    const toggleEdit = () => {
      isEditing.value = !isEditing.value
    }

    const isDefaultAddress = (address) => {
      return address && address.id === defaultAddress.value.id
    }

    return {
      userErrors,
      addresses,
      toggleEdit,
      isDefaultAddress,
      addressesLoaded,
      isEditing,
      defaultAddress,
    }
  },
}
</script>

<template>
  <h1>Your Addresses</h1>
  <div>
    <button
      :name="`${isEditing ? 'Cancel' : 'Add New Address'}`"
      class="button"
      @click.prevent="toggleEdit"
    >
      {{ isEditing ? 'Cancel' : 'Add New Address' }}
    </button>
  </div>

  <div>
    <template v-if="!addressesLoaded"> loading </template>
    <template v-else-if="addresses && Array.isArray(addresses)">
      <template v-if="isEditing">
        <address-form
          :is-editing.sync="isEditing"
          action="create"
          @submitted="toggleEdit"
        />
      </template>

      <template v-else>
        <pre v-if="userErrors.length">{{
          JSON.stringify(userErrors, null, 2)
        }}</pre>
        <div>
          <div v-if="addresses.length">
            <address-item
              v-for="(address, index) in addresses"
              :key="index"
              :address="address"
              :show-delete="addresses.length > 1"
              :is-default="isDefaultAddress(address)"
            />
          </div>
        </div>
      </template>
    </template>
    <section v-else>
      <address-form action="create" @submitted="toggleEdit" />
    </section>
  </div>
</template>
