<template>
  <section v-if="content" class="py-12 bg-gray-50 sm:py-16 lg:py-20">
    <div
      class="
        max-w-md
        mx-auto
        pl-4
        pr-8
        text-center
        sm:max-w-lg sm:px-6
        lg:max-w-7xl lg:px-8
      "
    >
      <h1
        v-if="content.fields.heading"
        class="
          text-3xl
          leading-10
          font-extrabold
          tracking-tight
          text-gray-900 text-center
          sm:text-4xl sm:leading-none
          lg:text-5xl
        "
      >
        {{ content.fields.heading }}
      </h1>
      <div
        v-if="content.fields.text"
        class="
          mt-6
          max-w-3xl
          mx-auto
          text-l
          leading-normal
          text-gray-500 text-center
          lg:text-xl
        "
        v-html="$contentful.richText(content.fields.text)"
      />
      <nuxt-link
        v-if="content.fields.linkUrl"
        :to="content.fields.linkUrl"
        class="
          mt-8
          inline-block
          border border-transparent
          rounded-md
          py-3
          px-8
          text-base
          font-medium
          text-white
          bg-indigo-600
          hover:bg-indigo-700
        "
      >
        {{ content.fields.linkText }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroBanner',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
