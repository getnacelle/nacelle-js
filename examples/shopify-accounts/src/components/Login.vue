<script>
import { ref, inject } from 'vue'

export default {
  name: 'Login',
  setup() {
    const login = inject('login')
    const userErrors = inject('userErrors')

    const form = ref({
      email: '',
      password: '',
    })

    const submitForm = () => {
      const { email, password } = form.value
      login({ email, password })
    }

    return { form, userErrors, submitForm }
  },
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <form
      ref="form"
      method="post"
      accept-charset="UTF-8"
      novalidate="novalidate"
      @submit.prevent="submitForm"
    >
      <input type="hidden" name="form_type" value="customer_login" />
      <input type="hidden" name="utf8" value="✓" />
      <input type="hidden" name="return_url" value="/account" />
      <input
        v-model="form.email"
        type="text"
        name="customer[email]"
        placeholder="email"
      />
      <input
        v-model="form.password"
        type="password"
        name="customer[password]"
        placeholder="password"
      />
      <button class="button">Login</button>

      <ul v-if="userErrors.length">
        <li>Error:</li>
        <li v-for="(error, index) in userErrors" :key="index" class="error">
          {{ error.message }}
        </li>
      </ul>
    </form>
    <div>
      <a href="#/details">Account Details</a>
      <br />
      <a href="#/register"> Create an Account</a>
      <br />
      <a href="#/recover">Forgot password?</a>
    </div>
  </div>
</template>
