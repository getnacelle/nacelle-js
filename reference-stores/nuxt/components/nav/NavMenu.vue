<template>
  <div v-if="links" class="border-t border-gray-200 py-6 px-4 space-y-6">
    <div v-for="(link, index) in links" :key="index" class="flow-root">
      <nuxt-link
        :to="link.fields.url"
        class="-m-2 p-2 block font-medium text-gray-900"
      >
        {{ link.fields.text }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    links() {
      return this.content?.navigation?.filter((navigationItem) => {
        return navigationItem.type === 'partNavigationLink';
      });
    }
  }
};
</script>
