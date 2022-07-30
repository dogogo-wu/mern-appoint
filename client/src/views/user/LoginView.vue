<template>
  <div>
    <form @submit.prevent="handleLogin" class="border rounded-xl bg-white">
      <h3 class="text-lg m-4 font-bold">Login</h3>
      <div>
        <label>Email: </label>
        <input
          class="myinput"
          v-model="email"
          type="email"
          name="email"
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          class="myinput"
          v-model="password"
          type="password"
          name="password"
          required
        />
      </div>
      <button class="mybtn">Login</button>
      <div>{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useMyStore } from "../../stores/myStore";
import router from "../../router/index";

export default {
  setup() {
    const mystore = useMyStore();
    const email = ref("");
    const password = ref("");

    const error = ref(null);

    const handleLogin = async () => {
      const user = { email: email.value, password: password.value };
      const response = await fetch(
        process.env.VUE_APP_BACKEND_LOCAL + "/api/user/login",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        error.value = json.error;
      }
      if (response.ok) {
        console.log("user login", json);
        localStorage.setItem('appointuser', JSON.stringify(json))
        mystore.user = json;
        
        router.push('/')
      }
    };

    return { email, password, handleLogin, error };
  },
};
</script>

<style lang="postcss">
.myinput {
  @apply w-1/2
        py-2
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        my-4
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none;
}
.mybtn {
  @apply px-4
          py-2
          bg-blue-500
          hover:bg-blue-600
          text-white text-sm
          font-medium
          rounded-full
          font-semibold;
}
</style>