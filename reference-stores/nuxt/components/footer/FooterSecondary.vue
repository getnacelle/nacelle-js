<template>
  <div
    v-if="content"
    class="
      mt-8
      border-t border-gray-200
      pt-8
      md:flex md:items-center md:justify-between
    "
  >
    <div v-if="social" class="flex space-x-6 md:order-2">
      <a
        v-for="(account, index) in social"
        :key="index"
        :href="account.url"
        class="text-gray-500 hover:text-gray-900"
      >
        <span class="sr-only">{{ account.name }}</span>
        <span class="h-6 w-6" v-html="account.icon" />
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
import facebookIcon from '~/assets/svgs/facebook';
import twitterIcon from '~/assets/svgs/twitter';
import githubIcon from '~/assets/svgs/github';

export default {
  name: 'FooterSecondary',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  computed: {
    icons() {
      return {
        facebook: facebookIcon,
        twitter: twitterIcon,
        github: githubIcon
      };
    },
    social() {
      return (
        this.content &&
        ['facebook', 'twitter', 'github']
          .filter((account) => this.content[`${account}Url`])
          .map((account) => ({
            name: account,
            url: this.content[`${account}Url`],
            icon: this.icons[account]
          }))
      );
    }
  }
};
</script>
