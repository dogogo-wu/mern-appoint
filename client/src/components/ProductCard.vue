<template>
  <div class="bg-white rounded-xl p-4">
    <p>Product: {{product.title}}</p>
    <p>Image: {{product.img}}</p>
    <p>Describe: {{product.content}}</p>
    <p>my_id: {{product.my_id}}</p>
  </div>
</template>

<script>
export default {
    props:["product"],
};
</script>