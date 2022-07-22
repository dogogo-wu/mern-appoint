<template>
  <div class="flex justify-center">
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <a href="#!">
        <img
          class="rounded-t-lg w-80"
          src="https://mdbootstrap.com/img/new/standard/nature/184.jpg"
          alt=""
        />
      </a>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">
          {{ product.title }}
        </h5>
        <div class="text-gray-700 text-base mb-4">
          <p>Image: {{ product.img }}</p>
          <p>Describe: {{ product.content }}</p>
          <p>prod_id: {{ product.my_id }}</p>
        </div>
        <button class="appoint-btn m-4">預約</button>
        <button class="appoint-btn m-4 bg-red-500" @click="handleDelete">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import {useMyStore} from '../stores/myStore'

export default {
  props: ["product"],
  setup(props){

    const myStore =useMyStore();
    const handleDelete =async ()=>{
        const response = await fetch(process.env.VUE_APP_BACKEND_LOCAL +'/api/products/' + props.product._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            myStore.deleteProd(props.product._id)
            console.log('Delete one product', json);
            // window.location.reload();
        }
    }
    return {handleDelete}
  }
};
</script>

<style lang="postcss">
.appoint-btn {
  @apply 
            px-6
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