<template>
  <div class="absolute flex lg:relative">
    <nuxt-link to="/">
      <span class="sr-only">Workflow</span>
      <span class="flex h-8 w-8" v-html="logoIcon" />
    </nuxt-link>
  </div>
</template>

<script>
import logoIcon from '~/assets/svgs/logo';

export default {
  name: 'HeaderLogo',
  data: () => ({ logoIcon })
};
</script>
