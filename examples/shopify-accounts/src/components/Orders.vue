<script>
import { ref, inject, onMounted } from 'vue'

export default {
  setup() {
    const fetchOrders = inject('fetchOrders')
    const orders = inject('orders')
    const fetchTransactions = inject('fetchTransactions')
    const currentOrder = ref(null)
    const toggleOrderDetails = async (id) => {
      await fetchTransactions(id)
      if (currentOrder.value && currentOrder.value.id === id) {
        currentOrder.value = null
      } else {
        currentOrder.value = orders.value.find((order) => order.id === id)
      }
    }

    onMounted(async () => {
      await fetchOrders()
    })
    return {
      orders,
      currentOrder,
      toggleOrderDetails,
    }
  },
}
</script>

<template>
  <div>
    <h1>Order Details</h1>
    <ul v-for="order in orders">
      <li>
        <button @click.prevent="() => toggleOrderDetails(order.id)">
          name: {{ order.name }} | price: ${{ order.total_price }}
        </button>
        <div v-if="currentOrder && currentOrder.id === order.id">
          <p>Order details</p>
          <pre>{{ JSON.stringify(currentOrder, null, 2) }}</pre>
        </div>
      </li>
    </ul>
  </div>
</template>
