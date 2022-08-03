<template>
  <div class="flex justify-center m-4">
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <img
        class="rounded-t-lg w-80 h-48 object-cover"
        :src="`data:${product.img.contentType};base64,${product.img.image}`"
        alt=""
      />
      <div class="px-6 py-4">
        <h5 class="text-gray-700 text-xl font-bold mb-2 text-center">
          {{ product.title }}
        </h5>
        <ul class="mylist text-gray-700 text-base mb-4">
          <li>描述：{{ product.content }}</li>
          <li>地點：{{ product.location }}</li>
          <li>項目編號：# {{ product.my_id }}</li>
        </ul>

        <div class="flex justify-center">
          <button class="appoint-btn" @click="handleAppoint">
            <span>立即預約</span>
          </button>
          <button
            v-if="mystore.user && mystore.user.admin"
            class="appoint-btn ml-4 bg-red-500 hover:bg-red-700"
            @click="handleDelete"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMyStore } from "../../stores/myStore";
import router from "../../router/index";

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
        alert('已刪除一個項目~')
      }
    };
    const handleAppoint = () => {
      router.push("/appoint/" + props.product._id);
    };
    return { handleDelete, handleAppoint, mystore };
  },
};
</script>

<style lang="postcss">
.appoint-btn {
  @apply px-8
            py-2
            bg-blue-600
            text-white
            font-semibold
            leading-tight
            rounded-full
            hover:shadow-md
            hover:bg-blue-700
            transition
            duration-150
            ease-in-out;
}
.mylist li{
  list-style-type: disc;
  margin-left: 1rem;
  padding-top: 6px;
  padding-bottom: 4px;
}
</style>