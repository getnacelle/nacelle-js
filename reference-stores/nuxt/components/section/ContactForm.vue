<template>
  <section v-if="content" class="py-12 px-4 sm:py-16 lg:py-20">
    <div class="max-w-3xl mx-auto">
      <div
        v-if="success"
        class="
          flex
          bg-green-50
          mx-auto
          py-5
          px-5
          border-2 border-green-300
          rounded-lg
          sm:px-6
          lg:px-7
        "
      >
        <span class="text-green-500 mr-4 h-6 w-6" v-html="successIcon" />
        {{ content.fields.successText }}
      </div>
      <form
        v-if="!success"
        class="grid grid-cols-1 gap-y-6"
        @submit.prevent="handleSubmit"
      >
        <div>
          <label for="full-name" class="sr-only">Name</label>
          <input
            id="full-name"
            v-model="formModel.name"
            type="text"
            name="full-name"
            autocomplete="name"
            required
            class="
              block
              w-full
              shadow-sm
              py-3
              px-4
              placeholder-gray-500
              focus:ring-indigo-500 focus:border-indigo-500
              border border-gray-300
              rounded-md
            "
            :placeholder="content.fields.namePlaceholder"
          />
        </div>
        <div>
          <label for="email" class="sr-only">Email</label>
          <input
            id="email"
            v-model="formModel.email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="
              block
              w-full
              shadow-sm
              py-3
              px-4
              placeholder-gray-500
              focus:ring-indigo-500 focus:border-indigo-500
              border border-gray-300
              rounded-md
            "
            :placeholder="content.fields.emailPlaceholder"
          />
        </div>
        <div>
          <label for="phone" class="sr-only">Phone</label>
          <input
            id="phone"
            v-model="formModel.phone"
            type="text"
            name="phone"
            autocomplete="tel"
            required
            class="
              block
              w-full
              shadow-sm
              py-3
              px-4
              placeholder-gray-500
              focus:ring-indigo-500 focus:border-indigo-500
              border border-gray-300
              rounded-md
            "
            :placeholder="content.fields.phonePlaceholder"
          />
        </div>
        <div>
          <label for="message" class="sr-only">Message</label>
          <textarea
            id="message"
            v-model="formModel.message"
            name="message"
            rows="4"
            required
            class="
              block
              w-full
              shadow-sm
              py-3
              px-4
              placeholder-gray-500
              focus:ring-indigo-500 focus:border-indigo-500
              border border-gray-300
              rounded-md
            "
            :placeholder="content.fields.messagePlaceholder"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            class="
              inline-flex
              justify-center
              py-3
              px-6
              border border-transparent
              shadow-sm
              text-base
              font-medium
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
            "
          >
            {{ content.fields.buttonText }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import successIcon from '~/assets/svgs/success';

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
    success: false,
    successIcon
  }),
  methods: {
    handleSubmit() {
      this.success = true;
    }
  }
};
</script>
