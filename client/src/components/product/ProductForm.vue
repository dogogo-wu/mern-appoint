<template>
  <div class="myprod-container">
    <form
      ref="myform"
      @submit.prevent="handleSubmit"
      enctype="multipart/form-data"
      class="flex flex-col"
    >
      <h3 class="myform-title">Add a New Item</h3>
      <div>
        <label class="text-left" for="title">Title</label>
        <input class="myinput" type="text" name="title" id="title" required />
      </div>
      <div>
        <label for="img">Image</label>
        <input
          class="myfile-input"
          type="file"
          id="img"
          name="img"
          accept="image/*"
          required
        />
      </div>
      <div>
        <label for="content">Description</label>
        <input class="myinput" type="text" name="content" required />
      </div>
      <div>
        <label for="location">Location</label>
        <input class="myinput" type="text" name="location" required />
      </div>
      <div v-if="error" class="myerr">{{ error }}</div>
      <button class="myuser-form-btn w-2/3 mx-auto">新增項目</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "../../router/index";
import { useMyStore } from "../../stores/myStore";
export default {
  setup() {
    const myform = ref(null);
    const error = ref(null);
    const mystore = useMyStore();
    const handleSubmit = () => {
      var formData = new FormData(myform.value);

      const createProd = async () => {
        try {
          const response = await fetch(
            process.env.VUE_APP_BACKEND_LOCAL + "/api/products",
            {
              method: "POST",
              body: formData,
              headers: { Authorization: `Bearer ${mystore.user.token}` },
            }
          );
          const json = await response.json();
          mystore.products.unshift(json);

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

    return { myform, handleSubmit, error };
  },
};
</script>


<style lang="postcss">
.myprod-container {
  @apply border rounded-xl bg-white max-w-xl mx-auto py-4 px-10 sm:px-20 my-8 shadow-md hover:shadow-lg transition;
}
.myfile-input {
  @apply block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded file:border-0
      file:text-sm file:font-semibold
      file:bg-indigo-50 file:text-indigo-700
      hover:file:bg-indigo-100
      border border-solid border-gray-300
      rounded
      mb-4;
}
</style>
