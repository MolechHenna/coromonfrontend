<script setup>
import FooterPage from "./components/FooterPage.vue";
import HeaderNav from "./components/HeaderNav.vue";
</script>

<template>
  <HeaderNav />
  <main>
    <RouterView />
  </main>
  <FooterPage />
</template>
