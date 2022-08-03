<template>
  <div class="flex justify-evenly flex-wrap">
    <!-- Use card component and slot to reuse -->
    <div v-if="product" class="rounded-lg shadow-lg bg-white max-w-sm m-2">
      <img
        class="rounded-t-lg w-80 h-48 object-cover"
        :src="`data:${product.img.contentType};base64,${product.img.image}`"
        alt=""
      />
      <div class="px-6 pt-4">
        <h5 class="text-gray-700 text-xl font-bold mb-2 text-center">
          {{ product.title }}
        </h5>
        <ul class="mylist text-gray-700 text-base mb-4">
          <li>描述：{{ product.content }}</li>
          <li>地點：{{ product.location }}</li>
          <li>項目編號：# {{ product.my_id }}</li>
        </ul>
      </div>
      <AppointCreateForm :product="product" :prodAppos="prodAppos" />
    </div>
    <div class="">
      <AppointAlready :prodAppos="prodAppos" />
    </div>
  </div>
</template>

<script setup>
import { useMyStore } from "../../stores/myStore";
import { onMounted, ref } from "vue-demi";
import AppointAlready from "../../components/appoint/AppointAlready.vue";
import AppointCreateForm from "../../components/appoint/AppointCreateForm.vue";
import ProductCard from "../../components/product/ProductCard.vue";

const props = defineProps({
  id: String,
});

const mystore = useMyStore();
var product = ref(null);
var prodAppos = ref([]);

onMounted(async () => {
  if (!mystore.products) {
    await mystore.fetchProds();
  }
  product.value = mystore.products.find((data) => data._id === props.id);

  await mystore.fetchAppos();
  prodAppos.value = mystore.appoints.filter((data) => data.prod === props.id);
});
</script>

<style>
</style>