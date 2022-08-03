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
        <img src="../../assets/logo_cir.png" class="h-12" alt="Logo">
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
      <Menu as="div" class="relative inline-block md:hidden">
        <div>
          <MenuButton
            class="
              inline-flex
              justify-center
              w-full
              rounded-md
              border border-gray-300
              hover:shadow-sm
              px-2
              py-2
              bg-gray-100
              text-sm
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="
              origin-top-right
              absolute
              right-0
              mt-2
              w-56
              rounded-md
              shadow-lg
              bg-white
              ring-1 ring-black ring-opacity-5
              focus:outline-none
            "
          >
            <div class="py-1 text-center">
              <MenuItem>
                <a class="mynav-btn-menu" @click="router.push('/')">
                  所有項目
                </a>
              </MenuItem>
              <MenuItem v-if="mystore.user && mystore.user.admin">
                <a class="mynav-btn-menu" @click="router.push('/create')">
                  新增項目
                </a>
              </MenuItem>
              <MenuItem v-if="mystore.user">
                <a class="mynav-btn-menu" @click="router.push('/appoint_my')">
                  我的預約
                </a>
              </MenuItem>
              <MenuItem v-if="mystore.user && mystore.user.admin">
                <a class="mynav-btn-menu" @click="router.push('/appoint_all')">
                  所有預約
                </a>
              </MenuItem>
              <MenuItem v-if="!mystore.user" class="block mx-12 my-4">
                <a class="login-btn" @click="router.push('/login')"> Login </a>
              </MenuItem>
              <MenuItem v-if="!mystore.user" class="block mx-12 my-4">
                <a class="login-btn" @click="router.push('/signup')">
                  Signup
                </a>
              </MenuItem>
              <MenuItem
                v-if="mystore.user"
                class="py-4 border-t-2 w-4/5 mx-auto"
              >
                <span class="block text-sm">{{ mystore.user.email }}</span>
              </MenuItem>
              <MenuItem v-if="mystore.user">
                <button class="login-btn mb-4 text-sm" @click="handleLogout">
                  Logout
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
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
            <button class="login-btn ml-3 text-sm" @click="handleLogout">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import router from "../../router/index";
import { useMyStore } from "../../stores/myStore";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

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
.login-add {
}
.login-btn {
  @apply px-4
            py-1
            inline-block
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
  hover:text-slate-500;
}
.mynav-btn.router-link-exact-active {
  @apply rounded 
  bg-transparent
text-blue-700;
}
.mynav-btn-menu {
  @apply font-bold 
    block
    text-sm 
    py-4
    px-4
  text-gray-700 rounded
  hover:bg-gray-100;
}
.mynav-btn-menu.router-link-exact-active {
  @apply text-blue-700;
}
</style>