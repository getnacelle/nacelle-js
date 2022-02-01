<template>
  <section
    v-if="content"
    class="relative bg-gray-800 py-28 px-6 sm:py-32 sm:px-12 lg:px-16"
  >
    <div v-if="content.image" class="absolute inset-0 overflow-hidden">
      <nuxt-img
        :src="content.image.file.asset.url"
        :alt="content.image.alt"
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
        v-if="content.heading"
        class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
      >
        {{ content.heading }}
      </h2>
      <p v-if="content.text" class="mt-3 text-xl text-white">
        {{ content.text }}
      </p>
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
