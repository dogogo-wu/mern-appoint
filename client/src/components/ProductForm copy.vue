<template>
  <form
    ref="myform"
    @submit.prevent="handleSubmit"
    enctype="multipart/form-data"
  >
    <h3>Add a New Product</h3>

    <label for="title">Name: </label>
    <input type="text" id="title" name="title" required />
    <label for="img">Image: </label>
    <input type="file" id="img" name="img" accept="image/*" />
    <label for="content">Describe: </label>
    <input type="text" name="content" required />
    <button type="submit">Add Product</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const myform = ref(null);
    const handleSubmit = () => {
      var formData = new FormData(myform.value);

      const createProd = async () => {
        try {
          await fetch(process.env.VUE_APP_BACKEND_LOCAL + "/api/products", {
            method: "POST",
            body: formData,
          });
          
        } catch (error) {
          console.log(error);
        }
      };
      createProd();
    };

    return { myform, handleSubmit };
  },
};
</script>