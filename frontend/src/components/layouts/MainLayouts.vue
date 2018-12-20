<template>
  <div id="app">
    <my-header></my-header>
  </div>
</template>

<script>
  import Header from '../includes/Header'
  export default {
    name: 'MainLayouts',
    components:{
      'my-header':Header
    }
  }
</script>
