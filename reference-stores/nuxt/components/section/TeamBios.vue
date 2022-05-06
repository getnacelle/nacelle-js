<template>
  <section v-if="content" class="bg-gray-50">
    <div class="mx-auto py-24 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-32">
      <div class="space-y-12">
        <h2
          v-if="content.fields.heading"
          class="text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          {{ content.fields.heading }}
        </h2>
        <ul
          role="list"
          class="
            space-y-12
            lg:grid
            lg:grid-cols-2
            lg:items-start
            lg:gap-x-8
            lg:gap-y-12
            lg:space-y-0
          "
        >
          <li v-for="(member, index) in content.fields.members" :key="index">
            <div
              class="
                space-y-4
                sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0
                lg:gap-8
              "
            >
              <div
                v-if="member.fields.image"
                class="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4"
              >
                <nuxt-picture
                  class="shadow-lg rounded-lg overflow-hidden"
                  :src="$contentful.imageUrl(member.fields.image)"
                  :alt="member.fields.imageAlt"
                  quality="80"
                  width="500"
                  :img-attrs="{ class: 'object-center object-cover h-full' }"
                />
              </div>
              <div class="sm:col-span-2">
                <div class="space-y-4">
                  <div class="text-lg leading-6 font-medium space-y-1">
                    <h3 v-if="member.fields.name">{{ member.fields.name }}</h3>
                    <p v-if="member.fields.role" class="text-indigo-600">
                      {{ member.fields.role }}
                    </p>
                  </div>
                  <div class="text-lg">
                    <div
                      v-if="member.fields.text"
                      class="text-gray-500"
                      v-html="$contentful.richText(member.fields.text)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TeamBios',
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
