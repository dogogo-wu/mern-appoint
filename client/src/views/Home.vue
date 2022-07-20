<template>
  <div class="home">
    <h1 class="text-6xl">Hello</h1>
    <div v-for="item in products" :key="item._id">
      <p>{{item.title}}</p>

    </div>
  </div>
</template>

<script>
import {ref, onMounted } from 'vue'

export default {
  name: "Home",
  setup() {
    const products = ref(null);


    onMounted(async () => {
      const response = await fetch("http://localhost:4000/api/products");
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        products.value = json;
      }
    });

    return {products}
  },
};
</script>
