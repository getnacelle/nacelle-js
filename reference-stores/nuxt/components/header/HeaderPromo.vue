<template>
  <div
    v-if="content"
    class="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8"
  >
    {{ content.text }}
  </div>
</template>

<script>
export default {
  name: 'HeaderPromo',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
