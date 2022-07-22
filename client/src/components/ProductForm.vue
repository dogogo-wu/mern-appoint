<template>
  <form @submit.prevent="handleSubmit">
    <h3 class="text-lg font-bold mb-4">Add a New Product</h3>

    <div class="flex flex-col justify-center">
      <label for="title">Name: </label>
      <input
        type="text"
        v-model="title"
        class="myinput"
        id="title"
        name="title"
        required
      />
      <label for="img">Image: </label>
      <input type="text" v-model="img" class="myinput" id="img" name="img" />
      <label for="content">Describe: </label>
      <input
        type="text"
        v-model="content"
        class="myinput"
        id="content"
        name="content"
        required
      />
    </div>

    <button class="mybtn">Add Product</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import router from "../router/index";
export default {
  setup() {
    const title = ref("");
    const img = ref("");
    const content = ref("");
    const error = ref(null);

    const handleSubmit = async () => {
      const product = {
        title: title.value,
        img: img.value,
        content: content.value,
      };
      const response = await fetch(
        process.env.VUE_APP_BACKEND_LOCAL + "/api/products",
        {
          method: "POST",
          body: JSON.stringify(product),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
        error.value = json.error;
      }
      if (response.ok) {
        console.log("add new product", json);
        router.push("/");
      }
    };

    return { title, img, content, handleSubmit, error };
  },
};
</script>