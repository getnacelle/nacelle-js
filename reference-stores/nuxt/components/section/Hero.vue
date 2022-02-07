<template>
  <section v-if="content" class="bg-white">
    <div class="relative bg-gray-900">
      <div
        v-if="content.image"
        aria-hidden="true"
        class="absolute inset-0 overflow-hidden"
      >
        <nuxt-picture
          :src="content.image.file.asset.url"
          :alt="content.image.alt"
          sizes="sm:100vw lg:100vw xl:100vw"
          quality="80"
          class="picture"
        />
      </div>
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-gray-900 opacity-50"
      ></div>

      <div
        class="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-48 lg:px-0"
      >
        <h1
          v-if="content.heading"
          class="text-4xl font-extrabold tracking-tight text-white lg:text-6xl"
        >
          {{ content.heading }}
        </h1>
        <p v-if="content.text" class="mt-4 text-xl text-white">
          {{ content.text }}
        </p>
        <nuxt-link
          v-if="content.link"
          :to="content.link.url"
          class="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
          >{{ content.link.text }}</nuxt-link
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroMain',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .picture img {
  @apply w-full h-full object-center object-cover;
}
</style>
