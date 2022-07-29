<template>
  <div>
    <nav class="bg-gray-200">
      <router-link to="/">Home</router-link> |
      <router-link to="/create">Create</router-link> |
      <router-link to="/myappoint">My Appoint</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link>
    </nav>
    <Navbar />
    <router-view class="bg-gray-100 p-16" />
  </div>
</template>

<script setup>
import { onMounted } from "vue-demi";
import { useMyStore } from "./stores/myStore";
import Navbar from "./components/Navbar.vue";

const mystore = useMyStore();

onMounted(() => {
  mystore.user = JSON.parse(localStorage.getItem('user'))
});

</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
