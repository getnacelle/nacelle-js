<template>
  <transition name="toast">
    <div
      class="border-red-400 bg-red-50 border-2 rounded py-2 px-4 text-red-500 shadow absolute top-100 right-4 flex items-center"
      v-if="toastState == 'visible'"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        class="fill-red-500 w-8 mr-2 animate-pulse"
      >
        <path
          d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"
        />
      </svg>
      <p>
        Uh oh! An
        <span class="underline" @click="openCart">item in your cart</span> is
        out of stock.
      </p>
    </div>
  </transition>
</template>
<script setup>
const { itemOutOfStock, openCart } = useCart()
const toastState = ref('not-visible')

watch(itemOutOfStock, (value) => {
  if (value == true) {
    toastState.value = 'visible'
    setTimeout(() => {
      toastState.value = 'not-visible'
    }, 3000)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s;
}
.toast-enter,
.toast-leave-active {
  opacity: 0;
}
</style>
