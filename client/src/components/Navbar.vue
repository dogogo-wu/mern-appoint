<template>
  <nav class="bg-gray-200 flex justify-between items-center px-8 py-4">
    <div>
      <p class="text-2xl font-bold mr-8">Dogogo 預約系統</p>
    </div>
    <div class="mynav-inner mr-auto">
      <router-link to="/" class="">所有項目</router-link> |
      <router-link to="/create">新增項目</router-link> |
      <router-link to="/myappoint">我的預約</router-link>
    </div>
    <div>
      <div v-if="!mystore.user">
        <router-link to="/login" class="login-btn mr-4">Login</router-link>
        <router-link to="/signup" class="login-btn">Signup</router-link>
      </div>
      <div v-if="mystore.user">
        <span>{{ mystore.user.email }}</span>
        <button class="mybtn ml-4" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import router from "../router/index";
import { useMyStore } from "../stores/myStore";

const mystore = useMyStore();
const handleLogout = () => {
  localStorage.removeItem("appointuser");
  mystore.user = null;
  router.push("/");
};
</script>

<style lang="scss">
nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    padding-bottom: 8px;
  }
}
.mynav-inner {
  a {
    &.router-link-exact-active {
      border-bottom: 3px solid #3546ff;
    }
  }
}
.login-btn {
  &.router-link-exact-active {
    background: #f97316;
    color: white;
  }
}
</style>

<style lang="postcss">
.login-btn {
  @apply px-4
            py-2
            border-2
            border-orange-500
            rounded-full
            transition
            duration-300
            ease-in-out
            hover:bg-orange-500
            hover:text-white;
}
</style>