<template>
  <div class="container-sm mt-3">
    <form class="d-flex gap-2" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search Coromon"
        v-model="searchQuery"
      />
      <div class="dropdown">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selectedType === "" ? "All Type" : selectedType }}
        </a>

        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#" @click.prevent="selectedType = ''"
              >All Type</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectedType = 'Ice'"
              ><img src="/coromonimage/icons/ice.webp" /> Ice</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectedType = 'Fire'"
              ><img src="/coromonimage/icons/fire.webp" /> Fire</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectedType = 'Water'"
              ><img src="/coromonimage/icons/water.webp" /> Water</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectedType = 'Normal'"
              ><img src="/coromonimage/icons/normal.webp" /> Normal</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectedType = 'Electric'"
              ><img src="/coromonimage/icons/electric.webp" /> Electric</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectedType = 'Ghost'"
              ><img src="/coromonimage/icons/ghost.webp" /> Ghost</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectedType = 'Sand'"
              ><img src="/coromonimage/icons/sand.webp" /> Sand</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="selectedType = 'Crimsonite'"
              ><img src="/coromonimage/icons/crimsonite.webp" /> Crimsonite</a
            >
          </li>
        </ul>
      </div>
    </form>
  </div>

  <div class="container-sm mt-3">
    <div class="row g-3">
      <!-- placeholders -->
      <div
        v-if="isLoading"
        class="col-12 col-sm-6 col-md-4 col-lg-2"
        v-for="n in placeholders"
        :key="n"
      >
        <div class="p-2 h-100 rounded card-item bg-body-secondary">
          <div class="row p-2">
            <div class="placeholder-glow">
              <span class="placeholder col-12" style="height: 80px"></span>
            </div>
          </div>
          <div class="col-8">
            <div class="placeholder-glow">
              <span class="placeholder col-6 mb-2"></span>
              <span class="placeholder col-8 mb-2"></span>
              <span class="placeholder col-5"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- actual cards -->
      <RouterLink
        v-else
        class="col-12 col-sm-6 col-md-4 col-lg-2 text-decoration-none"
        v-for="coromon in filteredCoromons"
        :key="coromon.id"
        :to="`/coromon/${coromon.id}`"
        style="color: inherit"
      >
        <div
          class="p-2 h-100 rounded card-item bg-secondary-subtle"
          :class="`type-${coromon.element_type.toLowerCase()}`"
        >
          <div class="fw-bold">
            {{ String(coromon.id).padStart(3, "0") }}
          </div>
          <div class="row p-2">
            <img
              :src="`/coromonimage/icons/${coromon.name.toLowerCase()}.webp`"
              style="
                image-rendering: pixelated;
                height: 80px;
                object-fit: contain;
              "
            />
          </div>
          <div class="col-8 small">
            <div class="">
              Name: {{ coromon.name.replace("Crimsonite", "").trim() }}
            </div>

            <div class="">
              Type:
              <img
                :src="`/coromonimage/icons/${coromon.element_type.toLowerCase()}.webp`"
              />
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const coromons = ref([]);
const searchQuery = ref("");
const selectedType = ref("");

const filteredCoromons = computed(() => {
  return coromons.value.filter((coromon) => {
    const matchesName = coromon.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesType =
      selectedType.value === "" ||
      coromon.element_type.toLowerCase() === selectedType.value.toLowerCase();
    return matchesName && matchesType;
  });
});

const isLoading = ref(true);
const placeholders = Array.from({ length: 24 }, (_, i) => i);

onMounted(async () => {
  let page = 1;
  let allData = [];

  while (true) {
    const response = await fetch(
      `https://coromonapi.onrender.com/coromon?page=${page}&limit=10`,
    );
    const json = await response.json();

    allData = [...allData, ...json.data];

    if (allData.length >= json.total) break;
    page++;
  }

  coromons.value = allData;

  isLoading.value = false;
});
</script>

<style scoped>
.card-item {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

a:hover .card-item {
  transform: translateY(-5px);
}

.type-ice {
  border: 2px solid #90e0ef;
}
.type-ice:hover {
  box-shadow: 0 0 12px #90e0ef;
}

.type-fire {
  border: 2px solid #f4731c;
}
.type-fire:hover {
  box-shadow: 0 0 12px #f4731c;
}

.type-water {
  border: 2px solid #4895ef;
}
.type-water:hover {
  box-shadow: 0 0 12px #4895ef;
}

.type-normal {
  border: 2px solid #adb5bd;
}
.type-normal:hover {
  box-shadow: 0 0 12px #adb5bd;
}

.type-electric {
  border: 2px solid #f9c74f;
}
.type-electric:hover {
  box-shadow: 0 0 12px #f9c74f;
}

.type-ghost {
  border: 2px solid #7b2d8b;
}
.type-ghost:hover {
  box-shadow: 0 0 12px #7b2d8b;
}

.type-sand {
  border: 2px solid #d4a017;
}
.type-sand:hover {
  box-shadow: 0 0 12px #d4a017;
}

.type-crimsonite {
  border: 2px solid #e63946;
}
.type-crimsonite:hover {
  box-shadow: 0 0 12px #e63946;
}
</style>
