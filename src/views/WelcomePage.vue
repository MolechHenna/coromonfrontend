<template>
  <div class="container mt-5">
    <!-- Hero Section -->
    <div class="text-center mb-5">
      <img
        src="/coromonimage/icons/logo.webp"
        style="height: 160px"
        class="mb-3"
      />
      <h1 class="fw-bold">Welcome to the Coromon Database</h1>
      <p class="text-muted">
        A fan-made database and toolkit built by Molech Matt Henna
      </p>
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

    <!-- Links -->
    <div class="row g-3 mb-5">
      <div class="col-12 col-md-4">
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
      <div class="col-12 col-md-4">
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
      <div class="col-12 col-md-4">
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
    </div>
  </div>
</template>
