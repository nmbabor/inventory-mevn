<template>
  <div id="app">
   <comment v-bind:is="layout"></comment>
  </div>
</template>

<script>
const main = 'main'
export default {
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta.layout || main) + '-layout'
    }
  }
}
</script>

<style>
/*  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }*/
</style>
