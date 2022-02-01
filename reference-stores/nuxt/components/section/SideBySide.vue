<template>
  <section class="bg-white">
    <div class="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4">
      <div class="max-w-2xl mx-auto px-4 lg:max-w-none">
        <div
          class="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2"
        >
          <div>
            <h2
              v-if="content.heading"
              class="text-4xl font-extrabold tracking-tight text-gray-900"
            >
              {{ content.heading }}
            </h2>
            <p v-if="content.text" class="mt-4 text-gray-500">
              {{ content.text }}
            </p>
          </div>
          <div
            v-if="content.image"
            class="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden"
          >
            <nuxt-img
              :src="content.image.file.asset.url"
              :alt="content.image.alt"
              :width="600"
              class="object-center object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SideBySide',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
