<script>
import { ref, inject, onMounted } from 'vue';

export default {
  name: 'Details',
  setup() {
    const customer = inject('customer');
    const updateCustomer = inject('updateCustomer');

    const firstName = ref(customer.value?.firstName || '');
    const lastName = ref(customer.value?.lastName || '');
    const displayName = ref(customer.value?.displayName || '');
    const email = ref(customer.value?.email || '');
    const phone = ref(customer.value?.phone || '');
    const password = ref(customer.value?.password || '');
    const acceptsMarketing = ref(customer.value?.acceptsMarketing || false);

    onMounted(async () => {
      if (customer.value) {
        firstName.value = customer.value?.firstName;
        lastName.value = customer.value?.lastName;
        displayName.value = customer.value?.displayName;
        email.value = customer.value?.email;
        phone.value = customer.value?.phone;
        password.value = customer.value?.password;
        acceptsMarketing.value = customer.value?.acceptsMarketing;
      }
    });

    const submitForm = async () => {
      await updateCustomer({
        customer: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
          acceptsMarketing: acceptsMarketing.value
        }
      });

      window.location.href = '/';
    };

    return {
      firstName,
      lastName,
      displayName,
      email,
      phone,
      password,
      acceptsMarketing,
      submitForm,
      customer
    };
  }
};
</script>

<template>
  <div class="page account-index page-account">
    <div class="account-box-wide">
      <div class="account-body">
        <div class="account-body-interior type-f">
          <section class="section section-details">
            <h1 class="form-title">Account Information</h1>
            <form
              method="post"
              @submit.prevent="submitForm"
              accept-charset="UTF-8"
            >
              <input type="hidden" name="form_type" value="customer" /><input
                type="hidden"
                name="utf8"
                value="✓"
              />
              <h2>Edit Customer</h2>

              <div class="grid">
                <div class="grid__item medium-up--one-half">
                  <label for="FirstName">First Name</label>
                  <input
                    id="FirstName"
                    v-model="firstName"
                    type="text"
                    name="customer[first_name]"
                    autocomplete="given-name"
                  />
                </div>

                <div class="grid__item medium-up--one-half">
                  <label for="LastName">Last Name</label>
                  <input
                    id="LastName"
                    v-model="lastName"
                    type="text"
                    name="customer[last_name]"
                    autocomplete="family-name"
                  />
                </div>
              </div>

              <label for="Email">Email</label>
              <input
                id="Email"
                v-model="email"
                type="text"
                name="customer[email]"
                autocomplete="email"
              />

              <label for="Phone">Phone</label>
              <input
                id="Phone"
                v-model="phone"
                type="text"
                name="customer[phone]"
                autocomplete="phone"
              />

              <label for="Password">Password</label>
              <input
                id="Password"
                v-model="password"
                type="password"
                name="customer[password]"
                autocomplete="password"
              />

              <div class="text-center">
                <input
                  id="AcceptsMarketing"
                  v-model="acceptsMarketing"
                  type="checkbox"
                  name="customer[accepts_marketing]"
                />
                <label for="AcceptsMarketing">Accepts Marketing</label>

                <div>
                  <input type="submit" class="button" value="Save" />
                </div>
              </div>

              <input type="hidden" name="_method" value="put" />
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
