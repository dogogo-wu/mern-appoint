<template>
  <div class="home">
    <h1 class="text-5xl mb-4">All Products</h1>
    <div class="flex justify-around flex-wrap">
      <div v-for="item in products" :key="item._id">
        <ProductCard :product="item" />
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard},
  setup() {
    const products = ref(null);

    onMounted(async () => {
      const response = await fetch(
        process.env.VUE_APP_BACKEND_LOCAL + "/api/products"
      );
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        products.value = json;
      }
    });

    return { products };
  },
};
</script>
