<template>
  <div id="app">
    <navbar />
   <router-view/>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar
  }
}
</script>
<style lang="scss" scoped>
  #app {
    height: 100vh;
  }
</style>

