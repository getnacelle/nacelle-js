<script>
import { ref, computed, watch, inject, onMounted } from 'vue'

export default {
  props: {
    address: {
      type: Object,
      default: () => {
        return {
          id: '',
          address1: '',
          address2: '',
          city: '',
          company: '',
          country: 'United States',
          firstName: '',
          lastName: '',
          phone: '',
          province: '',
          zip: '',
        }
      },
    },
    action: {
      type: String,
      default: 'update',
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const defaultAddress = inject('defaultAddress')
    const countries = inject('countries')
    const provinces = inject('provinces')
    const fetchProvince = inject('fetchProvince')
    const fetchCountries = inject('fetchCountries')
    const createAddress = inject('createAddress')
    const updateAddress = inject('updateAddress')
    const updateDefaultAddress = inject('updateDefaultAddress')

    const hasError = ref(false)
    const setToDefault = ref(false)
    const phoneNumber = ref('')
    const newAddress = ref({ ...props.address })
    const id = props.address.id

    const ctaLabel = computed(() =>
      props.action === 'update' ? 'Edit Address' : 'Add New Address'
    )
    const isDefault = computed(() => {
      if (defaultAddress.value) {
        return props.address.id === defaultAddress.value.id
      }
      return false
    })

    const countryObject = computed(() => {
      if (countries.value) {
        return countries.value.find(
          (country) => country.name === newAddress.value.country
        )
      } else {
        return null
      }
    })

    watch(countryObject, () => {
      if (props.address.country && countryObject.value.shortName) {
        fetchProvince({ countryShortName: countryObject.value.shortName })
      }
    })

    watch(defaultAddress, () => {
      if (defaultAddress.value) {
        setToDefault.value = props.address.id === defaultAddress.value.id
      }
    })

    onMounted(async () => {
      await fetchCountries()
      if (defaultAddress.value) {
        setToDefault.value = props.address.id === defaultAddress.value.id
      }
    })

    const removeError = () => {
      hasError.value = false
    }

    const submitForm = async () => {
      if (
        !newAddress.value.city ||
        !newAddress.value.address1 ||
        !newAddress.value.country ||
        !newAddress.value.phone ||
        !newAddress.value.province
      ) {
        hasError.value = true
        return
      }

      if (!isDefault.value && setToDefault.value && props.address) {
        await updateDefaultAddress({ address: props.address })
      }

      const addressObject = {
        id: props.address.id,
        address: {
          address1: newAddress.value.address1,
          address2: newAddress.value.address2,
          city: newAddress.value.city,
          company: newAddress.value.company,
          country: newAddress.value.country,
          firstName: newAddress.value.firstName,
          lastName: newAddress.value.lastName,
          phone: newAddress.value.phone,
          province: newAddress.value.province,
          zip: newAddress.value.zip,
        },
      }
      if (props.action === 'create') {
        await createAddress(addressObject)
      }
      if (props.action === 'update') {
        await updateAddress(addressObject)
      }
      if (props.action === 'updateDefault') {
        await updateDefaultAddress(addressObject)
      }

      window.location.href = '/'
    }

    return {
      defaultAddress,
      countries,
      provinces,
      hasError,
      setToDefault,
      phoneNumber,
      newAddress,
      id,
      ctaLabel,
      isDefault,
      countryObject,
      removeError,
      submitForm,
    }
  },
}
</script>

<template>
  <form
    :id="`address_form_${id}`"
    :action="`/account/addresses/${id}`"
    method="post"
    name="address"
    accept-charset="UTF-8"
  >
    <input type="hidden" name="form-name" value="address" />
    <input type="hidden" name="form_type" value="customer_address" /><input
      type="hidden"
      name="utf8"
      value="✓"
    />
    <div class="fields">
      <div class="field">
        <label :for="`AddressFirstName_${id}`">First Name</label>
        <input
          :id="`AddressFirstName_${id}`"
          v-model="newAddress.firstName"
          type="text"
          name="address[first_name]"
          placeholder="First Name"
          autocomplete="given-name"
        />
      </div>

      <div class="field">
        <label :for="`AddressLastName_${id}`">Last Name</label>
        <input
          :id="`AddressLastName_${id}`"
          v-model="newAddress.lastName"
          type="text"
          name="address[last_name]"
          placeholder="Last Name"
          autocomplete="family-name"
        />
      </div>
    </div>

    <div class="fields">
      <div class="field one-whole" :class="{ error: hasError && !country }">
        <label :for="`AddressCountry_${id}`">Country*</label>
        <select
          :id="`AddressCountry_${id}`"
          v-model="newAddress.country"
          name="address[province]"
          autocomplete="address-level"
          required
        >
          <option
            v-for="country in countries"
            :key="country.name"
            :value="country.name"
          >
            {{ country.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="fields">
      <div class="field one-whole">
        <label :for="`AddressCompany_${id}`">Company (Optional)</label>
        <input
          :id="`AddressCompany_${id}`"
          v-model="newAddress.company"
          type="text"
          name="address[company]"
          autocomplete="organization"
          placeholder="Company"
        />
      </div>
    </div>

    <div class="fields">
      <div class="field" :class="{ error: hasError && !address1 }">
        <label :for="`AddressAddress1_${id}`">Address*</label>
        <input
          :id="`AddressAddress1_${id}`"
          v-model="newAddress.address1"
          :class="{ 'input-error': hasError && !address1 }"
          type="text"
          name="address[address1]"
          autocomplete="street-address address-line1"
          placeholder="Address"
          required
          @focus="removeError"
        />
      </div>

      <div class="field">
        <label :for="`AddressAddress2_${id}`">Address (Optional)</label>
        <input
          :id="`AddressAddress2_${id}`"
          v-model="newAddress.address2"
          type="text"
          name="address[address2]"
          autocomplete="street-address address-line2"
          placeholder="Suite, Apt"
        />
      </div>
    </div>

    <div class="fields">
      <div class="field city" :class="{ error: hasError && !city }">
        <label :for="`AddressCity_${id}`">City*</label>
        <input
          :id="`AddressCity_${id}`"
          v-model="newAddress.city"
          :class="{ 'input-error': hasError && !city }"
          type="text"
          name="address[city]"
          autocomplete="address-level2"
          placeholder="City"
          required
          @focus="removeError"
        />
      </div>
      <div class="field state" :class="{ error: hasError && !province }">
        <div id="AddressProvinceContainer_3026220941371" style="">
          <label :for="`AddressProvince_${id}`">State*</label>
          <select
            :id="`AddressProvince_${id}`"
            v-model="newAddress.province"
            name="address[province]"
            autocomplete="address-level1"
          >
            <option
              v-for="province in provinces"
              :key="province"
              :value="province"
            >
              {{ province }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="fields">
      <div class="field">
        <label :for="`AddressZip_${id}`">Postal/Zip Code</label>
        <input
          :id="`AddressZip_${id}`"
          v-model="newAddress.zip"
          type="text"
          name="address[zip]"
          autocapitalize="characters"
          autocomplete="postal-code"
        />
      </div>

      <div class="field" :class="{ error: hasError && !phone }">
        <label :for="`AddressPhone_${id}`">Phone*</label>
        <input
          :id="`AddressPhone_${id}`"
          v-model="newAddress.phone"
          :class="{ 'input-error': hasError && !phone }"
          type="tel"
          pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
          name="address[phone]"
          autocomplete="phone"
          placeholder="Phone"
          required
          @focus="removeError"
        />
      </div>
    </div>

    <div class="fields tablet-col">
      <div v-if="defaultAddress" class="field push-right">
        <div class="align-items-center">
          <input
            :id="`address_default_address_${id}`"
            v-model="setToDefault"
            type="checkbox"
            name="address[default]"
            value="true"
          />
          <label :for="`address_default_address_${id}`"
            >Set as default address</label
          >
        </div>
      </div>
    </div>

    <div class="fields tablet-col">
      <div class="field push-right address-buttons">
        <div class="btns">
          <input
            :value="ctaLabel"
            type="submit"
            class="btn"
            @click.prevent="submitForm"
          />
        </div>
      </div>
    </div>

    <input type="hidden" name="_method" value="put" />
  </form>
</template>
