<template>
  <form
    ref="myform"
    @submit.prevent="handleSubmit"
    enctype="multipart/form-data"
  >
    <h3 class="text-lg font-bold mb-4">Add a New Product</h3>
    <div class="flex flex-col justify-center">
      <div>
        <label for="title">Name: </label>
        <input class="myinput" type="text" id="title" name="title" required />
      </div>
      <div>
        <label for="img">Image: </label>
        <input
          class="myinput"
          type="file"
          id="img"
          name="img"
          accept="image/*"
        />
      </div>
      <div>
        <label for="content">Describe: </label>
        <input class="myinput" type="text" name="content" required />
      </div>
    </div>

    <button class="mybtn">Add Product</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script>
import { ref } from "vue";
import router from "../router/index";
export default {
  setup() {
    const myform = ref(null);
    const error = ref(null);
    const handleSubmit = () => {
      var formData = new FormData(myform.value);

      const createProd = async () => {
        try {
          await fetch(process.env.VUE_APP_BACKEND_LOCAL + "/api/products", {
            method: "POST",
            body: formData,
          });
          myform.value.reset();
          console.log("add new product");
          router.push("/");
        } catch (err) {
          console.log(err);
          error.value = err;
        }
      };
      createProd();
    };

    return { myform, handleSubmit };
  },
};
</script>


<style lang="postcss">

</style>
