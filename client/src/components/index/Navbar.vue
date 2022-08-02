<template>
  <nav
    class="
      bg-gray-200
      border-gray-200
      px-2
      sm:px-4
      py-2
      rounded
      dark:bg-gray-900
    "
  >
    <div class="flex flex-wrap justify-between items-center mx-auto">
      <router-link to="/" class="flex items-center">
        <!-- <img src="" class="mr-3 h-6 sm:h-9" alt="Logo"> -->
        <span
          class="
          p-3
            self-center
            text-2xl
            font-semibold
            whitespace-nowrap
            dark:text-white
          "
          >預約系統</span
        >
      </router-link>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="
          inline-flex
          items-center
          p-2
          ml-3
          text-sm text-gray-500
          rounded-lg
          md:hidden
          hover:bg-gray-100
          focus:outline-none focus:ring-2 focus:ring-gray-200
          dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600
        "
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        class="mynav-inner hidden w-full md:block md:w-auto"
        id="navbar-default"
      >
        <ul
          class="
            flex flex-col
            mt-4
            bg-gray-200
            rounded-lg
            md:flex-row md:items-center md:mt-0 md:bg-gray-200
            dark:bg-gray-800
            md:dark:bg-gray-900
            dark:border-gray-700
          "
        >
          <li>
            <router-link to="/" class="mynav-btn">所有項目</router-link>
          </li>
          <li v-if="mystore.user && mystore.user.admin">
            <router-link to="/create" class="mynav-btn">新增項目</router-link>
          </li>
          <li v-if="mystore.user">
            <router-link to="/appoint_my" class="mynav-btn"
              >我的預約</router-link
            >
          </li>
          <li v-if="mystore.user && mystore.user.admin">
            <router-link to="/appoint_all" class="mynav-btn"
              >所有預約</router-link
            >
          </li>
          <li v-if="!mystore.user">
            <router-link to="/login" class="login-btn mx-4">Login</router-link>
            <router-link to="/signup" class="login-btn">Signup</router-link>
          </li>
          <li v-if="mystore.user">
            <span class="ml-4 text-sm">{{ mystore.user.email }}</span>
            <button class="login-btn ml-3 text-sm" @click="handleLogout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import router from "../../router/index";
import { useMyStore } from "../../stores/myStore";

const mystore = useMyStore();
const handleLogout = () => {
  localStorage.removeItem("appointuser");
  mystore.user = null;
  mystore.appoints = [];
  router.push("/");
};
</script>

<style lang="scss">
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
            py-1
            border-2
            border-orange-500
            rounded-full
            transition
            duration-300
            ease-in-out
            hover:bg-orange-500
            hover:text-white;
}
.mynav-btn {
  @apply font-bold 
    block 
    py-3 
    px-2
    lg:px-4
  text-gray-700 rounded
  hover:bg-gray-100 
    md:hover:bg-transparent 
    md:border-0 
  md:hover:text-blue-700
  dark:text-gray-400 
  md:dark:hover:text-white
  dark:hover:bg-gray-700
  dark:hover:text-white 
    md:dark:hover:bg-transparent;
}

.mynav-btn.router-link-exact-active {
  @apply text-white 
  bg-blue-700 
  rounded 
  md:bg-transparent
   md:text-blue-700
    dark:text-white;
}
</style>