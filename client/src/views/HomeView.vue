<template>
  <div class="home">
    <h1 class="text-3xl font-bold mb-4">All Products</h1>
    <div class="flex justify-around flex-wrap">
      <div v-for="item in mystore.products" :key="item._id">
        <ProductCard :product="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ProductCard from "../components/product/ProductCard.vue";
import { useMyStore } from "../stores/myStore";

const mystore = useMyStore();

onMounted(async() => {
  if (!mystore.products.length) {
    await mystore.fetchProds();
  }
});
</script>
