<template>
  <div v-if="content" class="grid grid-cols-2 gap-8 md:grid-cols-4 mb-16">
    <div v-for="(menu, index) in content.navigation" :key="index" class="mt-10">
      <div>
        <h3
          class="text-sm font-semibold text-gray-500 tracking-wider uppercase"
        >
          {{ menu.fields.text }}
        </h3>
        <ul role="list" class="mt-4 space-y-4">
          <li v-for="(link, index1) in menu.fields.links" :key="index1">
            <nuxt-link
              :to="link.fields.url"
              class="text-base text-gray-500 hover:text-gray-900"
            >
              {{ link.fields.text }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterPrimary',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
