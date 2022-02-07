<template>
  <div
    v-if="content"
    class="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between"
  >
    <div class="flex space-x-6 md:order-2">
      <a
        v-for="(account, index) in content.social"
        :key="index"
        :href="account.url"
        class="text-gray-500 hover:text-gray-900"
      >
        <span class="sr-only">{{ account.name }}</span>
        <!-- eslint-disable vue/no-v-html -->
        <span
          class="h-6 w-6"
          v-html="require(`~/assets/svgs/${account.name}.svg?raw`)"
        />
        <!-- eslint-enable vue/no-v-html -->
      </a>
    </div>
    <p
      v-if="content.copyright"
      class="mt-8 text-base text-gray-500 md:mt-0 md:order-1"
    >
      &copy; {{ new Date().getFullYear() }} {{ content.copyright }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'FooterSecondary',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
