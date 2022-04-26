<template>
  <section
    v-if="content"
    class="relative bg-gray-800 py-28 px-6 sm:py-32 sm:px-12 lg:px-16"
  >
    <div v-if="content.fields.image" class="absolute inset-0 overflow-hidden">
      <nuxt-img
        :src="$contentful.imageUrl(content.fields.image)"
        :alt="content.fields.imageAlt"
        :width="1200"
        class="w-full h-full object-center object-cover"
      />
    </div>
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gray-900 bg-opacity-50"
    ></div>
    <div
      class="relative max-w-3xl mx-auto flex flex-col items-center text-center"
    >
      <h2
        v-if="content.fields.heading"
        class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
      >
        {{ content.fields.heading }}
      </h2>
      <!-- eslint-disable vue/no-v-html -->
      <div 
        v-if="content.fields.text" 
        class="mt-3 text-xl text-white"
        v-html="$contentful.richText(content.fields.text)"
      />
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </section>
</template>

<script>
export default {
  name: 'PromoStrip',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
