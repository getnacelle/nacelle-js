<template>
  <div v-if="features">
    <h3>
      <button
        type="button"
        class="
          group
          relative
          w-full
          py-6
          flex
          justify-between
          items-center
          text-left
        "
        aria-controls="disclosure-1"
        :aria-expanded="isExpanded"
        @click="isExpanded = !isExpanded"
      >
        <span
          :class="`text-sm font-medium${
            isExpanded ? ' text-indigo-600' : ' text-gray-900'
          }`"
        >
          Features
        </span>
        <span
          :class="`ml-6 h-6 w-6 flex items-center${
            isExpanded
              ? ' text-indigo-400 group-hover:text-indigo-50'
              : ' text-gray-400 group-hover:text-gray-500'
          }`"
          v-html="isExpanded ? minusIcon : plusIcon"
        />
        <!-- eslint-enable vue/no-v-html -->
      </button>
    </h3>
    <div v-show="isExpanded" id="disclosure-1" class="pb-6 prose prose-sm">
      <ul role="list">
        <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import minusIcon from '~/assets/svgs/minus';
import plusIcon from '~/assets/svgs/plus';

export default {
  name: 'ProductAccordion',
  props: {
    features: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    isExpanded: false,
    minusIcon,
    plusIcon
  }),
  methods: {
    handleAccordionClick(value) {
      this.isExpanded = value;
    }
  }
};
</script>
