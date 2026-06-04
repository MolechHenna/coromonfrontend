<template>
  <footer class="text-center text-muted mt-5 py-3 border-top">
    <div class="container-sm">
      <small>
        &copy; Matt {{ currentYear }} · Not affiliated with TRAGsoft or indie.io
        · Coromon is developed by TRAGsoft and published by indie.io · All
        Coromon-related content belongs to their respective owners. Please
        support the official release.
      </small>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
