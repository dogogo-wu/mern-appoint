<template>
  <div class="flex justify-center m-4">
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <img
        class="rounded-t-lg w-80 h-48 object-cover"
        :src="`data:${product.img.contentType};base64,${product.img.image}`"
        alt=""
      />
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">
          {{ product.title }}
        </h5>
        <div class="text-gray-700 text-base mb-4">
          <p>Describe: {{ product.content }}</p>
          <p>prod_id: {{ product.my_id }}</p>
        </div>

        <div>
          <button class="appoint-btn m-4" @click="handleAppoint">立即預約</button>
          <button v-if="mystore.user && mystore.user.admin"
            class="appoint-btn m-4 bg-red-500"
            @click="handleDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMyStore } from "../stores/myStore";
import router from "../router/index";

export default {
  props: ["product", "id"],
  setup(props) {
    const mystore = useMyStore();
    const handleDelete = async () => {
      const response = await fetch(
        process.env.VUE_APP_BACKEND_LOCAL +
          "/api/products/" +
          props.product._id,
        {
          headers: { Authorization: `Bearer ${mystore.user.token}` },
          method: "DELETE",
        }
      );
      const json = await response.json();
      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        mystore.deleteProd(props.product._id);
        console.log("Delete one product", json);
      }
    };
    const handleAppoint = async () => {
      router.push("/appoint/" + props.product._id);
    };
    return { handleDelete, handleAppoint, mystore };
  },
};
</script>

<style lang="postcss">
.appoint-btn {
  @apply px-6
            py-2
            bg-blue-600
            text-white
            font-medium
            leading-tight
            rounded-lg
            shadow-md
            hover:brightness-100 hover:shadow-lg
            active:brightness-50 active:shadow-lg
            transition
            duration-150
            ease-in-out;
}
</style>