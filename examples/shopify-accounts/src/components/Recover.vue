<script>
import { ref, inject } from 'vue'
export default {
  setup() {
    const userErrors = inject('userErrors')
    const recover = inject('recover')
    const form = ref({ email: '' })

    const submitForm = async () => {
      const { email } = form.value
      await recover({ email })

      window.location.href = '/'
    }

    return { form, userErrors, submitForm }
  },
}
</script>

<template>
  <form
    ref="form"
    method="post"
    accept-charset="UTF-8"
    novalidate="novalidate"
    @submit.prevent="submitForm"
  >
    <input type="hidden" name="form_type" value="recover_customer_password" />
    <input type="hidden" name="utf8" value="✓" />
    <input type="hidden" name="return_url" value="/account" />
    <input
      v-model="form.email"
      type="text"
      name="customer[email]"
      placeholder="email"
      autocomplete="email"
    />
    <button class="button">Recover</button>

    <ul v-if="userErrors.length">
      <li>Error:</li>
      <li v-for="(error, index) in userErrors" :key="index" class="error">
        {{ error.message }}
      </li>
    </ul>
  </form>
</template>
