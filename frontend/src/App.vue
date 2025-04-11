<template>
  <div id="app">
    <Navbar />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>