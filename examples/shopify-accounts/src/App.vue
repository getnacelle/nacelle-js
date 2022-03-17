<script>
import Account from './components/Account.vue'
import AccountProvider from './components/AccountProvider.vue'

export default {
  components: { AccountProvider, Account },
}
</script>

<template>
  <div class="app">
    <account-provider>
      <account />
    </account-provider>
  </div>
</template>
