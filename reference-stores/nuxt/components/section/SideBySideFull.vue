<template>
  <section v-if="content" class="relative bg-white">
    <div class="lg:absolute lg:inset-0">
      <div
        :class="`lg:absolute lg:inset-y-0 lg:w-1/2 ${
          content.layout === 'image-left' ? 'lg:left-0' : 'lg:right-0'
        }`"
      >
        <nuxt-picture
          v-if="content.image"
          class="picture"
          :src="content.image.file.asset.url"
          :alt="content.image.alt"
          sizes="sm:100vw lg:100vw xl:50vw"
          quality="80"
        />
      </div>
    </div>
    <div
      class="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2"
    >
      <div
        :class="
          content.layout === 'image-left'
            ? 'lg:col-start-2 lg:pl-8'
            : 'lg:col-start-1 lg:pr-8'
        "
      >
        <div
          :class="`text-base max-w-prose mx-auto lg:max-w-lg ${
            content.layout === 'image-left'
              ? 'lg:ml-auto lg:mr-0'
              : 'lg:mr-auto lg:ml-0'
          }`"
        >
          <h2
            v-if="content.subheading"
            class="leading-6 text-indigo-600 font-semibold tracking-wide uppercase"
          >
            {{ content.subheading }}
          </h2>
          <h3
            v-if="content.heading"
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            {{ content.heading }}
          </h3>
          <p v-if="content.text" class="mt-4 text-lg text-gray-500">
            {{ content.text }}
          </p>
          <div v-if="content.link" class="mt-6">
            <nuxt-link
              :to="content.link.url"
              class="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >{{ content.link.text }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
  @apply h-56 w-full object-cover lg:absolute lg:h-full;
}
</style>
