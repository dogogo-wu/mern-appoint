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

<script>
import { onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import {useMyStore} from '../stores/myStore'

export default {
  components: { ProductCard},
  setup() {
    const mystore = useMyStore()
    onMounted(async () => {
      const response = await fetch(
        process.env.VUE_APP_BACKEND_LOCAL + "/api/products"
      );
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        mystore.products = json;
        
      }
    });

    return {mystore};
  },
};
</script>
