<script>
import { ref, inject, onMounted, computed } from 'vue';

import Home from './Home.vue';
import Login from './Login.vue';
import Register from './Register.vue';
import Details from './Details.vue';
import Addresses from './Addresses.vue';
import Orders from './Orders.vue';
import Recover from './Recover.vue';
import Reset from './Reset.vue';
import NotFound from './NotFound.vue';

export default {
  setup() {
    const stayLoggedIn = inject('stayLoggedIn');
    const loginStatus = inject('loginStatus');
    const logout = inject('logout');
    const currentPath = ref(window.location.hash);

    const routes = computed(() => {
      if (loginStatus.value === 'loggedIn') {
        return {
          '/': Home,
          '/details': Details,
          '/addresses': Addresses,
          '/orders': Orders
        };
      }
      return {
        '/': Home,
        '/login': Login,
        '/register': Register,
        '/recover': Recover,
        '/reset': Reset,
        '/activate': Reset
      };
    });

    const currentView = computed(() => {
      return (
        routes.value[currentPath.value.slice(1).split('?')[0] || '/'] ||
        NotFound
      );
    });

    onMounted(async () => {
      await stayLoggedIn();
      window.addEventListener('hashchange', () => {
        currentPath.value = window.location.hash;
      });
    });
    return {
      currentView,
      loginStatus,
      logout
    };
  }
};
</script>

<template>
  <div class="nav">
    <div v-if="loginStatus === 'loggedIn'">
      <a href="#/">Home</a> | <a href="#/details">Details</a> |
      <a href="#/addresses">Addresses</a> |
      <a href="#/orders">Orders</a>
    </div>
    <div v-else>
      <a href="#/">Home</a> | <a href="#/login">Login</a> |
      <a href="#/register">Register</a>
    </div>
  </div>
  <button v-if="loginStatus === 'loggedIn'" @click.prevent="logout">
    Logout
  </button>
  <component :is="currentView" />
</template>
