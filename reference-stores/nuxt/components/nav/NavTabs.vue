<template>
  <div v-if="tabs" class="mt-2">
    <div class="border-b border-gray-200">
      <div
        class="-mb-px flex px-4 space-x-8"
        aria-orientation="horizontal"
        role="tablist"
      >
        <button
          v-for="(tab, index) in tabs"
          :key="`tab-${index}`"
          class="
            flex-1
            whitespace-nowrap
            py-4
            px-1
            border-b-2
            text-base
            font-medium
          "
          :class="
            activeIndex === index
              ? 'text-indigo-600 border-indigo-600'
              : 'text-gray-900 border-transparent'
          "
          :aria-controls="`tabs-${index}-panel`"
          role="tab"
          type="button"
          @click="handleClick(index)"
        >
          {{ tab.fields.text }}
        </button>
      </div>
    </div>
    <div
      v-for="(tab, index) in tabs"
      v-show="activeIndex === index"
      :key="`callout-${index}`"
      class="pt-10 pb-8 px-4 space-y-10"
      :aria-labelledby="`tab-menu-${index}`"
      role="tabpanel"
      :tabindex="index"
    >
      <div class="grid grid-cols-2 gap-x-4">
        <nuxt-link
          v-for="(callout, index1) in tab.callouts"
          :key="index1"
          :to="callout.fields.linkUrl"
          class="group relative text-sm"
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
              :src="$contentful.imageUrl(callout.fields.image)"
              :alt="callout.fields.imageAlt"
              quality="80"
              :img-attrs="{ class: 'w-full h-full object-center object-cover' }"
            />
          </div>
          <div
            v-if="callout.fields.heading"
            class="mt-6 block font-medium text-gray-900"
          >
            <span class="absolute z-10 inset-0" aria-hidden="true"></span>
            {{ callout.fields.heading }}
          </div>
          <p v-if="callout.fields.linkText" aria-hidden="true" class="mt-1">
            {{ callout.fields.linkText }}
          </p>
        </nuxt-link>
      </div>
    </div>
    <div
      v-for="(tab, index) in tabs"
      v-show="activeIndex === index"
      :key="`menu-${index}`"
      class="pt-10 pb-8 px-4 space-y-10"
      :aria-labelledby="`menu-${index}`"
      role="tabpanel"
      :tabindex="index"
    >
      <div v-for="(menu, index1) in tab.menus" :key="index1">
        <p v-if="menu.fields.text" class="font-medium text-gray-900">
          {{ menu.fields.text }}
        </p>
        <ul
          role="list"
          :aria-labelledby="`menu-${index}-heading-mobile`"
          class="mt-6 flex flex-col space-y-6"
        >
          <li
            v-for="(link, index2) in menu.fields.links"
            :key="index2"
            class="flow-root"
          >
            <nuxt-link
              :to="link.fields.url"
              class="-m-2 p-2 block text-gray-500"
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
  name: 'NavTabs',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    activeIndex: 0
  }),
  computed: {
    tabs() {
      return this.content?.navigation
        ?.filter((navigationItem) => {
          return navigationItem.type === 'partNavigationMega';
        })
        .map((navigationItem) => {
          const callouts = [];
          const fields = navigationItem?.fields;
          if (fields?.navigationCallout1) {
            callouts.push(fields?.navigationCallout1);
          }
          if (fields?.navigationCallout2) {
            callouts.push(fields?.navigationCallout2);
          }
          const menus = [];
          if (fields?.navigationGroup1) {
            menus.push(fields?.navigationGroup1);
          }
          if (fields?.navigationGroup2) {
            menus.push(fields?.navigationGroup2);
          }
          return {
            ...navigationItem,
            callouts,
            menus
          };
        });
    }
  },
  methods: {
    handleClick(value) {
      this.activeIndex = value;
    }
  }
};
</script>
