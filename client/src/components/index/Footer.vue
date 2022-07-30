<template>
  <footer>
    <div class="myfooter bg-gray-200">
      <p>Copyright © {{ new Date().getFullYear() }} Leon Wu (吳承勲).&ensp;</p>
      <p>All rights reserved.</p>
    </div>
  </footer>
</template>

<style>
.myfooter {
  text-align: center;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.myfooter p {
  margin: 0;
}
</style>