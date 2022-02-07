<template>
  <section v-if="content" class="py-12 px-4 sm:py-16 lg:py-20">
    <div class="max-w-3xl mx-auto">
      <div
        v-if="success"
        class="flex bg-green-50 mx-auto py-5 px-5 border border-2 border-green-300 rounded-lg sm:px-6 lg:px-7"
      >
        <!-- eslint-disable vue/no-v-html -->
        <span
          class="text-green-500 mr-4 h-6 w-6"
          v-html="require(`~/assets/svgs/success.svg?raw`)"
        />
        <!-- eslint-enable vue/no-v-html -->
        {{ content.success }}
      </div>
      <form
        v-if="!success"
        class="grid grid-cols-1 gap-y-6"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label for="full-name" class="sr-only">{{ content.name }}</label>
          <input
            id="full-name"
            v-model="formModel.name"
            type="text"
            name="full-name"
            autocomplete="name"
            required
            class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            :placeholder="`${content.name}*`"
          />
        </div>
        <div>
          <label for="email" class="sr-only">{{ content.email }}</label>
          <input
            id="email"
            v-model="formModel.email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            :placeholder="`${content.email}*`"
          />
        </div>
        <div>
          <label for="phone" class="sr-only">{{ content.phone }}</label>
          <input
            id="phone"
            v-model="formModel.phone"
            type="text"
            name="phone"
            autocomplete="tel"
            required
            class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            :placeholder="`${content.phone}*`"
          />
        </div>
        <div>
          <label for="message" class="sr-only">{{ content.message }}</label>
          <textarea
            id="message"
            v-model="formModel.message"
            name="message"
            rows="4"
            required
            class="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
            :placeholder="`${content.message}*`"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ content.button }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactForm',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    formModel: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    success: false
  }),
  methods: {
    handleSubmit() {
      this.success = true;
    }
  }
};
</script>
