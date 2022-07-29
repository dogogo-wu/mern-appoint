<template>
  <div>
    <form @submit.prevent="handleSignup" class="border rounded-xl bg-white">
      <h3 class="text-lg m-4 font-bold">Signup</h3>
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
      <button class="mybtn">Signup</button>
      <div>{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useMyStore } from "../stores/myStore";
import router from "../router/index";

export default {
  setup() {
    const mystore = useMyStore();
    const email = ref("");
    const password = ref("");

    const error = ref(null);

    const handleSignup = async () => {
      const user = { email: email.value, password: password.value };
      const response = await fetch(
        process.env.VUE_APP_BACKEND_LOCAL + "/api/user/signup",
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
        console.log("add new user", json);
        localStorage.setItem('appointuser', JSON.stringify(json))
        mystore.user = json;

        router.push('/')
      }
    };

    return { email, password, handleSignup, error };
  },
};
</script>