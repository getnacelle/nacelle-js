<template>
  <transition v-if="content" name="fade">
    <div
      v-show="active"
      class="
        absolute
        top-full
        inset-x-0
        border-t border-gray-200
        text-sm text-gray-500
        z-10
        transition
        ease-out
        duration-200
      "
    >
      <div
        class="absolute inset-0 top-1/2 bg-white shadow"
        aria-hidden="true"
      />
      <div class="relative bg-white">
        <div class="max-w-7xl mx-auto px-8">
          <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
            <div class="col-start-2 grid grid-cols-2 gap-x-8">
              <nuxt-link
                v-for="(callout, index1) in callouts"
                :key="index1"
                :to="callout.fields.linkUrl"
                class="group relative text-base sm:text-sm"
              >
                <div
                  v-if="callout.fields.image"
                  class="
                    aspect-w-1 aspect-h-1
                    rounded-lg
                    bg-gray-100
                    overflow-hidden
                    group-hover:opacity-75
                  "
                >
                  <nuxt-picture
                    class="picture"
                    :src="$contentful.imageUrl(callout.fields.image)"
                    :alt="callout.fields.imageAlt"
                    quality="80"
                    sizes="lg:136px xl:25vw"
                  />
                </div>
                <div
                  v-if="callout.fields.heading"
                  class="mt-6 block font-medium text-gray-900"
                >
                  <span class="absolute z-10 inset-0" aria-hidden="true"></span>
                  {{ callout.fields.heading }}
                </div>
                <p
                  v-if="callout.fields.linkText"
                  aria-hidden="true"
                  class="mt-1"
                >
                  {{ callout.fields.linkText }}
                </p>
              </nuxt-link>
            </div>
            <div class="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
              <div v-for="(menu, index) in menus" :key="index">
                <p v-if="menu.fields.text" class="font-medium text-gray-900">
                  {{ menu.fields.text }}
                </p>
                <ul
                  role="list"
                  :aria-labelledby="`${menu.fields.text}-heading`"
                  class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                >
                  <li
                    v-for="(link, index1) in menu.fields.links"
                    :key="index1"
                    class="flex"
                  >
                    <nuxt-link
                      :to="link.fields.url"
                      class="hover:text-gray-800"
                    >
                      {{ link.fields.text }}
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HeaderMega',
  props: {
    content: {
      type: Object,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    callouts() {
      const callouts = [];
      const fields = this.content?.fields;
      if (fields?.navigationCallout1) {
        callouts.push(fields?.navigationCallout1);
      }
      if (fields?.navigationCallout2) {
        callouts.push(fields?.navigationCallout2);
      }
      return callouts;
    },
    menus() {
      const menus = [];
      const fields = this.content?.fields;
      if (fields?.navigationGroup1) {
        menus.push(fields?.navigationGroup1);
      }
      if (fields?.navigationGroup2) {
        menus.push(fields?.navigationGroup2);
      }
      return menus;
    }
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

::v-deep .picture img {
  @apply w-full h-full object-center object-cover sm:rounded-lg;
}
</style>
