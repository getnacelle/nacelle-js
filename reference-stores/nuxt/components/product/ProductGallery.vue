<template>
  <div v-if="images.length" class="flex flex-col-reverse">
    <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
      <div
        class="grid grid-cols-4 gap-6"
        aria-orientation="horizontal"
        role="tablist"
      >
        <button
          v-for="(image, index) in images"
          :id="`tabs-1-tab-${index}`"
          :key="image.src"
          class="
            relative
            h-24
            bg-white
            rounded-md
            flex
            items-center
            justify-center
            text-sm
            font-medium
            uppercase
            text-gray-900
            cursor-pointer
            hover:bg-gray-50
            focus:outline-none
            focus:ring
            focus:ring-offset-4
            focus:ring-opacity-50
          "
          :aria-controls="`tabs-1-panel-${index}`"
          role="tab"
          type="button"
          @click="handleImageClick(index)"
        >
          <span class="sr-only">
            {{ image.altText }}
          </span>
          <span class="absolute inset-0 rounded-md overflow-hidden">
            <nuxt-picture
              :src="image.src"
              :alt="image.altText"
              quality="80"
              sizes="xl:300px"
              :img-attrs="{ class: 'w-full h-full object-center object-cover' }"
            />
          </span>
          <span
            :class="`${
              activeImageIndex === index
                ? 'ring-indigo-500'
                : 'ring-transparent'
            } absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none`"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>

    <div class="w-full aspect-w-1 aspect-h-1">
      <div
        v-for="(image, index) in images"
        :id="`tabs-1-panel-${index}`"
        :key="image.src"
        :aria-labelledby="`tabs-1-panel-${index}`"
        role="tabpanel"
        tabindex="0"
        :class="index !== activeImageIndex ? 'hidden' : ''"
      >
        <nuxt-picture
          :src="image.src"
          :alt="image.altText"
          quality="80"
          sizes="md:100vw lg:1000px xl:800px"
          :img-attrs="{ class: 'w-full h-full object-center object-cover' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductGallery',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    activeImageIndex: 0
  }),
  computed: {
    images() {
      return this.product?.content.media.filter(
        (media) => media.type === 'IMAGE'
      );
    }
  },
  methods: {
    handleImageClick(index) {
      this.activeImageIndex = index;
    }
  }
};
</script>
