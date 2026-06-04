<template>
  <div class="container mt-5">
    <div class="text-center mb-5">
      <img
        src="/coromonimage/icons/logo.webp"
        style="height: 160px"
        class="mb-3"
      />
      <h1 class="fw-bold">Welcome to the Coromon Database</h1>
      <p class="text-muted">A fan-made database and toolkit built by Matt</p>
      <div class="d-flex justify-content-center gap-3 mt-3">
        <RouterLink to="/database" class="btn btn-primary">
          <i class="bi bi-database"></i> Browse Database
        </RouterLink>
        <RouterLink to="/teambuilder" class="btn btn-outline-primary">
          <i class="bi bi-people"></i> Team Builder
        </RouterLink>
      </div>
    </div>

    <!-- What is Coromon -->
    <div class="rounded p-4 bg-secondary-subtle mb-4">
      <h3 class="fw-bold mb-3">What is Coromon?</h3>
      <p>
        Coromon is a modern monster-taming RPG developed by TRAGsoft and
        published by indie.io. It features over 100 unique monsters called
        Coromon, each with their own types, stats, and variants: Standard,
        Potent, and Perfect.
      </p>
      <p>
        Think Pokémon but with a flexible stat system, a compelling story, and a
        charming pixel art style just like in generation 5.
      </p>
    </div>

    <div class="row g-3 mb-5">
      <div class="col-12 col-md-3">
        <a
          href="https://store.steampowered.com/app/1218210/Coromon/"
          target="_blank"
          class="text-decoration-none"
        >
          <div class="rounded p-4 bg-secondary-subtle text-center h-100">
            <i class="bi bi-steam fs-1"></i>
            <h5 class="fw-bold mt-2">Get Coromon</h5>
            <p class="text-muted small">Available on Steam</p>
          </div>
        </a>
      </div>

      <div class="col-12 col-md-3">
        <a
          href="https://coromon.wiki.gg"
          target="_blank"
          class="text-decoration-none"
        >
          <div class="rounded p-4 bg-secondary-subtle text-center h-100">
            <i class="bi bi-book fs-1"></i>
            <h5 class="fw-bold mt-2">Official Wiki</h5>
            <p class="text-muted small">Full game reference</p>
          </div>
        </a>
      </div>

      <div class="col-12 col-md-3">
        <a
          href="https://www.youtube.com/playlist?list=PL4n7K4EAzBvacSWOClFqEgWtpRQcq6rOm"
          target="_blank"
          class="text-decoration-none"
        >
          <div class="rounded p-4 bg-secondary-subtle text-center h-100">
            <i class="bi bi-youtube fs-1"></i>
            <h5 class="fw-bold mt-2">Watch the Series</h5>
            <p class="text-muted small">Whiskeryfrog's Coromon playlist</p>
          </div>
        </a>
      </div>

      <div class="col-12 col-md-3">
        <a href="#" class="text-decoration-none">
          <div
            class="rounded p-4 bg-secondary-subtle text-center h-100"
            role="button"
            @click="openSidebar"
          >
            <i class="bi bi-question-circle fs-1"></i>
            <h5 class="fw-bold mt-2">What is this web app?</h5>
            <p class="text-muted small">
              Learn more about this web application
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="infoSidebar"
    ref="infoSidebar"
    aria-labelledby="infoSidebarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="infoSidebarLabel">About This Web App</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>

    <div class="offcanvas-body">
      <p>
        This web application is built using <strong>Vue.js</strong> and
        <strong>Bootstrap</strong>, serving as the front-end interface for a
        custom API developed by me.
      </p>

      <p>
        The API is hosted on a free-tier service, which means it may enter a
        <strong>cold start</strong> state after periods of inactivity. During
        this time, the first request may take a few seconds to respond while the
        server wakes up.
      </p>

      <p>
        Once active, the application functions normally and provides real-time
        access to Coromon-related data and resources.
      </p>
    </div>
  </div>
</template>

<script scope>
import { ref, onMounted } from "vue";
import { Offcanvas } from "bootstrap";

export default {
  setup() {
    const infoSidebar = ref(null);
    let offcanvasInstance = null;

    onMounted(() => {
      offcanvasInstance = new Offcanvas(infoSidebar.value);
    });

    const openSidebar = () => {
      offcanvasInstance?.show();
    };

    return {
      infoSidebar,
      openSidebar,
    };
  },
};
</script>
