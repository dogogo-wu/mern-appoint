<template>
  <div class="">
    <h1 class="text-3xl font-bold">All Items</h1>
    <div v-if="mystore.products">
      <div v-if="mystore.products.length">
        <div class="flex flex-wrap justify-evenly">
          <div v-for="item in mystore.products" :key="item._id">
            <ProductCard :product="item" />
          </div>
        </div>
      </div>
      <div v-else class="p-4 font-bold text-cyan-600">
        目前沒有可預約的項目喔~
      </div>
    </div>
    <div v-else class="flex justify-center">
      <MyLoader />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ProductCard from "../../components/product/ProductCard.vue";
import { useMyStore } from "../../stores/myStore";
import MyLoader from "../../components/index/MyLoader.vue";

const mystore = useMyStore();

onMounted(async () => {
  if (!mystore.products) {
    await mystore.fetchProds();
  }
});
</script>
