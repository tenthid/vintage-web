<template>
  <web-header :loginLayout="false"></web-header>
  <slot></slot>
  <web-footer></web-footer>
</template>
  
<script setup>
  import WebHeader from '@/components/header/WebHeader.vue'
  import WebFooter from '@/components/footer/WebFooter.vue'
</script>

<style scoped>
    
</style>