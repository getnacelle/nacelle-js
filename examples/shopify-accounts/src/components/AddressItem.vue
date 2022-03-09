<template>
  <div>
    <p>
      <span>{{ address.name }}</span
      ><br />
      <span v-for="(item, itemIndex) in address.formatted" :key="itemIndex"
        >{{ item }}<br
      /></span>
    </p>
    <br />
    <div class="button-wrapper">
      <button class="button" @click.prevent="toggleEdit">
        {{ isEditing ? 'Cancel' : 'Edit' }}
      </button>
      <button
        v-if="showDelete"
        class="button"
        @click.prevent="deleteAddress({ id: address.id })"
      >
        Delete
      </button>
    </div>
    <div v-if="isEditing" class="edit-form">
      <address-form
        :address="address"
        action="update"
        :is-default-address="isDefaultAddress"
      />
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import AddressForm from './AddressForm.vue'

export default {
  components: { AddressForm },
  filters: {
    formatAddress(value) {
      const addressString = `
        ${value.name}
      `
      value.formatted.forEach((item) => {
        addressString.concat(`
          ${item}<br>
        `)
      })
      return addressString
    },
  },
  props: {
    address: {
      type: Object,
      required: true,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    isDefaultAddress: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isEditing = ref(false)
    const deleteAddress = inject('deleteAddress')
    const toggleEdit = () => {
      isEditing.value = !isEditing.value
    }
    return {
      toggleEdit,
      isEditing,
      deleteAddress,
    }
  },
}
</script>
