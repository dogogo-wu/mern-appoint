<template>
  <div class="myform-container">
    <form @submit.prevent="handleSignup" class="flex flex-col">
      <h3 class="myform-title">Signup</h3>
      <div>
        <label class="text-left">Email</label>
        <input
          class="myinput"
          v-model="email"
          type="email"
          name="email"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          class="myinput"
          v-model="password"
          type="password"
          name="password"
          required
        />
      </div>
      <div class="myerr">{{ error }}</div>
      <button class="myuser-form-btn">Signup</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useMyStore } from "../../stores/myStore";
import router from "../../router/index";
import { onMounted } from "vue-demi";

export default {
  setup() {
    const mystore = useMyStore();
    const email = ref("");
    const password = ref("");

    const error = ref(null);

    onMounted(() => {
      if (mystore.user) {
        router.push("/");
      }
    });

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
        // console.log("add new user", json);
        localStorage.setItem("appointuser", JSON.stringify(json));
        mystore.user = json;

        router.go(-1);
      }
    };

    return { email, password, handleSignup, error };
  },
};
</script>