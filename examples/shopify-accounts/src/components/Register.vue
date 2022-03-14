<script>
import { ref, inject } from 'vue'

export default {
  name: 'Register',
  setup() {
    const userErrors = inject('userErrors')
    const register = inject('register')

    const form = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    })

    const submitForm = async () => {
      const { firstName, lastName, email, password } = form.value
      await register({ firstName, lastName, email, password })
      window.location.href = '/'
    }

    return { form, userErrors, submitForm }
  },
}
</script>

<template>
  <div>
    <h1>Create Account</h1>
    <form
      ref="form"
      method="post"
      accept-charset="UTF-8"
      novalidate="novalidate"
      @submit.prevent="submitForm"
    >
      <input type="hidden" name="form_type" value="create_customer" />
      <input type="hidden" name="utf8" value="✓" />
      <input type="hidden" name="return_url" value="/account" />
      <input
        v-model="form.firstName"
        type="text"
        name="customer[first_name]"
        placeholder="First Name"
        autocomplete="given-name"
      />
      <input
        v-model="form.lastName"
        type="text"
        name="customer[last_name]"
        placeholder="Last Name"
        autocomplete="family-name"
      />
      <input
        v-model="form.email"
        type="text"
        name="customer[email]"
        placeholder="email"
        autocomplete="email"
      />
      <input
        v-model="form.password"
        type="password"
        name="customer[password]"
        placeholder="password"
      />
      <button class="button">Create</button>

      <ul v-if="userErrors.length">
        <li>Error:</li>
        <li v-for="(error, index) in userErrors" :key="index" class="error">
          {{ error.message }}
        </li>
      </ul>
    </form>
  </div>
</template>
