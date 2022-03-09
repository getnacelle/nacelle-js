<script>
import { ref, inject, onMounted } from 'vue'
export default {
  props: {
    mode: {
      type: String,
      default: 'reset',
      validator(val) {
        return ['reset', 'activate'].includes(val)
      },
    },
  },
  setup(props) {
    const userErrors = inject('userErrors')
    const reset = inject('reset')
    const activate = inject('activate')

    const hasError = ref(false)
    const passwordType = ref('password')
    const passwordType2 = ref('password')
    const passwordConfirm = ref(null)
    const form = ref({
      password: '',
      resetToken: '',
      customerId: '',
      activationUrl: '',
    })

    onMounted(() => {
      if (props.mode === 'reset') {
        const params = window.location.href.split('?')[1].split('&')
        form.value.resetToken = params[1].replace('token=', '')
        form.value.customerId = params[0].replace('id=', '')
      }
      if (props.mode === 'activate' && process.client) {
        form.value.activationUrl = window.location
      }
    })

    const togglePassword = () => {
      passwordType.value = passwordType.value === 'text' ? 'password' : 'text'
    }
    const togglePassword2 = () => {
      passwordType2.value = passwordType2.value === 'text' ? 'password' : 'text'
    }
    const removeError = () => {
      hasError.value = false
    }

    const submitForm = async () => {
      const { password, resetToken, customerId, activationUrl } = form.value
      if (!password) {
        hasError.value = true
        return
      }

      if (password && password !== passwordConfirm.value) {
        hasError.value = true
        return
      }
      if (props.mode === 'reset') {
        await reset({ password, resetToken, customerId })
      } else if (this.mode === 'activate') {
        await activate({ activationUrl, password })
      }
      window.location.href = '/'
    }

    return {
      hasError,
      userErrors,
      passwordType,
      form,
      passwordType2,
      passwordConfirm,
      togglePassword,
      togglePassword2,
      submitForm,
      removeError,
    }
  },
}
</script>

<template>
  <form
    ref="form"
    method="post"
    name="reset"
    accept-charset="UTF-8"
    novalidate="novalidate"
    @submit.prevent="submitForm"
  >
    <input type="hidden" name="form-name" value="reset" />
    <input type="hidden" name="form_type" value="reset_customer_password" />
    <input type="hidden" name="utf8" value="✓" />
    <input type="hidden" name="return_url" value="/account" />
    <input v-model="form.resetToken" type="hidden" name="token" />
    <input v-model="form.customerId" type="hidden" name="id" />

    <pre v-if="userErrors.length">{{
      JSON.stringify(userErrors, null, 2)
    }}</pre>
    <div class="has-text-left">
      <div :class="{ error: hasError && !form.password }">
        <label class="is-block mt-3 mb-1">New Password</label>
        <input
          v-model="form.password"
          :type="passwordType"
          name="customer[password]"
          required
          :class="{ 'input-error': hasError && !form.password }"
          @focus="removeError()"
        />
        <form-input-error
          v-if="hasError && !form.password"
          text="Password cannot be empty."
        />
        <span
          v-if="form.password"
          class="button button-is-text is-small"
          type="button"
          @click="togglePassword()"
          >{{ passwordType == 'text' ? 'Hide' : 'Show' }}</span
        >
      </div>
      <div
        :class="{
          error:
            passwordConfirm &&
            form.password &&
            form.password != passwordConfirm,
        }"
      >
        <label class="is-block mt-3 mb-1">Confirm Password</label>
        <input
          v-model="passwordConfirm"
          :type="passwordType2"
          name="passwordConfirm"
          required
          :class="{
            'input-error':
              passwordConfirm &&
              form.password &&
              form.password != passwordConfirm,
          }"
          @focus="removeError()"
        />
        <span
          v-if="passwordConfirm"
          class="button button-is-text is-small"
          type="button"
          @click="togglePassword2()"
          >{{ passwordType2 == 'text' ? 'Hide' : 'Show' }}</span
        >
      </div>
    </div>
    <div class="btns">
      <button name="submit" class="button is-tertiary mt-3">Submit</button>
    </div>
  </form>
</template>
