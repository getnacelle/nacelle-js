<template>
  <section v-if="content" class="bg-white">
    <div class="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4">
      <div class="max-w-2xl mx-auto px-4 lg:max-w-none">
        <div
          class="grid grid-cols-1 items-center gap-y-10 gap-x-16 lg:grid-cols-2"
        >
          <div>
            <h2
              v-if="content.fields.heading"
              class="text-4xl font-extrabold tracking-tight text-gray-900"
            >
              {{ content.fields.heading }}
            </h2>
            <div
              v-if="content.fields.text"
              class="mt-4 text-gray-500"
              v-html="$contentful.richText(content.fields.text)"
            />
          </div>
          <div
            v-if="content.fields.image"
            class="aspect-w-3 aspect-h-2 bg-gray-100 rounded-lg overflow-hidden"
          >
            <nuxt-picture
              :src="$contentful.imageUrl(content.fields.image)"
              :alt="content.fields.imageAlt"
              quality="80"
              width="600"
              :img-attrs="{ class: 'object-center object-cover' }"
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
