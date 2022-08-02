<template>
  <div class="myform-container">
    <form @submit.prevent="handleLogin" class="flex flex-col">
      <h3 class="myform-title">Login</h3>
      <div>
        <label class="text-left ">Email</label>
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
      <button class="myuser-form-btn">Login</button>
      <p @click="handleGoSignup" class="mysignup-link">Not a member? Signup now</p> 
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useMyStore } from "../../stores/myStore";
import router from "../../router/index";
import { onMounted } from 'vue-demi';

export default {
  setup() {
    const mystore = useMyStore();
    const email = ref("");
    const password = ref("");

    const error = ref(null);

    onMounted(()=>{
      if (mystore.user) {
        router.push('/')
      }
    })

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
        
        router.go(-1)
      }
    };

    const handleGoSignup = ()=>{
      router.push('/signup')
    }

    return { email, password, handleLogin,handleGoSignup, error };
  },
};
</script>

<style lang="postcss">
.myform-container{
  @apply border rounded-xl bg-white max-w-md mx-auto py-6 px-10 sm:px-20 my-8 shadow-md hover:shadow-lg transition
}
.myform-title{
  @apply text-2xl text-center m-4 font-bold
}
.myinput {
  @apply block
  w-full
        p-2
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        mb-4
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none;
}
.mybtn {
  @apply px-4
          py-2
          bg-blue-500
          hover:bg-blue-600
          text-white text-sm
          rounded-full
          font-semibold;
}
.myuser-form-btn {
  @apply px-4
          py-2
          my-4
          bg-indigo-500
          hover:bg-indigo-600
          text-white
          rounded-full
          text-lg
          font-semibold
          transition
}
.mysignup-link{
  @apply text-slate-400 hover:text-blue-500 ml-auto cursor-pointer font-semibold text-sm py-3 transition
}
.myerr{
  @apply text-red-500 text-sm font-bold
}
</style>