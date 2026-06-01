<template>
  <div class="container-sm mt-3">
    <div v-if="isLoading">
      <div class="d-flex justify-content-center align-items-center gap-3 mb-3">
        <RouterLink
          :to="`/coromon/${Number(route.params.id) - 1}`"
          class="btn btn-outline-primary"
          :class="{ disabled: Number(route.params.id) <= 1 }"
        >
          <i class="bi bi-chevron-left"></i> Prev
        </RouterLink>

        <RouterLink to="/database" class="btn btn-secondary"> List </RouterLink>

        <RouterLink
          :to="`/coromon/${Number(route.params.id) + 1}`"
          class="btn btn-outline-primary"
          :class="{ disabled: Number(route.params.id) >= total }"
        >
          Next <i class="bi bi-chevron-right"></i>
        </RouterLink>
      </div>

      <div class="detail-card rounded p-4 bg-secondary-subtle">
        <!-- header -->
        <div class="text-center mb-3 placeholder-glow">
          <span class="placeholder col-2 mb-1"></span>
          <br />
          <span class="placeholder col-4 mb-1" style="height: 32px"></span>
          <br />
          <span class="placeholder col-2"></span>
        </div>

        <!-- image -->
        <div class="text-center mb-3 placeholder-glow">
          <span
            class="placeholder rounded"
            style="width: 160px; height: 160px; display: inline-block"
          ></span>
        </div>

        <!-- buttons -->
        <div class="d-flex justify-content-center gap-2 mb-4 placeholder-glow">
          <span
            class="placeholder rounded"
            style="width: 70px; height: 30px"
          ></span>
          <span
            class="placeholder rounded"
            style="width: 70px; height: 30px"
          ></span>
          <span
            class="placeholder rounded"
            style="width: 70px; height: 30px"
          ></span>
        </div>

        <!-- stats -->
        <div class="row g-2 justify-content-center placeholder-glow">
          <div class="col-12 col-md-8" v-for="n in 7" :key="n">
            <span
              class="placeholder col-12 rounded mb-2"
              style="height: 16px"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <!-- Navigation -->
      <div class="d-flex justify-content-center align-items-center gap-3 mb-3">
        <RouterLink
          :to="`/coromon/${Number(route.params.id) - 1}`"
          class="btn btn-outline-primary"
          :class="{ disabled: Number(route.params.id) <= 1 }"
        >
          <i class="bi bi-chevron-left"></i> Prev
        </RouterLink>

        <RouterLink to="/database" class="btn btn-secondary"> List </RouterLink>

        <RouterLink
          :to="`/coromon/${Number(route.params.id) + 1}`"
          class="btn btn-outline-primary"
          :class="{ disabled: Number(route.params.id) >= total }"
        >
          Next <i class="bi bi-chevron-right"></i>
        </RouterLink>
      </div>

      <!-- Main Card -->
      <div
        class="detail-card rounded p-4 bg-secondary-subtle"
        :class="`type-${coromon.element_type.toLowerCase()}`"
      >
        <!-- Header -->
        <div class="text-center mb-3">
          <span class="text-muted small"
            >NO: {{ String(coromon.id).padStart(3, "0") }}</span
          >
          <h2 class="fw-bold mb-0">{{ coromon.name }}</h2>
          <div
            class="d-flex justify-content-center align-items-center gap-2 mt-1"
          >
            <img
              :src="`/coromonimage/icons/${coromon.element_type.toLowerCase()}.webp`"
              style="image-rendering: pixelated; height: 20px"
            />
            <span>{{ coromon.element_type }}</span>
          </div>
        </div>

        <!-- Image -->
        <div class="text-center mb-3">
          <img
            :src="`/coromonimage/${variant}/${coromon.name.toLowerCase()}.gif`"
            style="
              image-rendering: pixelated;
              width: 160px;
              height: 160px;
              object-fit: contain;
            "
          />
        </div>
        <!-- Description -->
        <p class="mt-3 text-muted small text-center">{{ coromon.database }}</p>
        <!-- Variant Buttons -->
        <div class="d-flex justify-content-center gap-2 mb-4">
          <img
            src="/coromonimage/icons/standardbutton.webp"
            class="variant-btn"
            style="image-rendering: pixelated; cursor: pointer"
            :style="{ opacity: variant === 'standard' ? '1' : '0.5' }"
            @click="variant = 'standard'"
          />
          <img
            src="/coromonimage/icons/potentbutton.webp"
            class="variant-btn"
            style="image-rendering: pixelated; cursor: pointer"
            :style="{ opacity: variant === 'potent' ? '1' : '0.5' }"
            @click="variant = 'potent'"
          />
          <img
            src="/coromonimage/icons/perfectbutton.webp"
            class="variant-btn"
            style="image-rendering: pixelated; cursor: pointer"
            :style="{ opacity: variant === 'perfect' ? '1' : '0.5' }"
            @click="variant = 'perfect'"
          />
        </div>

        <!-- Stats -->
        <!-- Stats -->
        <div class="row g-2">
          <div class="col-12 mb-2 text-center">
            <span class="fw-bold"
              >Base Stat Total:
              {{
                coromon.hp +
                coromon.attack +
                coromon.spattack +
                coromon.defense +
                coromon.spdefense +
                coromon.speed +
                coromon.sp
              }}
            </span>
          </div>
          <div class="row g-2 justify-content-center">
            <div
              class="col-12 col-md-8"
              v-for="stat in stats"
              :key="stat.label"
            >
              <div class="d-flex align-items-center gap-2 mb-2">
                <div style="width: 90px" class="small text-muted fw-bold">
                  {{ stat.label }}
                </div>
                <div class="small fw-bold" style="width: 30px">
                  {{ stat.value }}
                </div>

                <!-- segmented bars: desktop only -->
                <div class="d-none d-lg-flex gap-1 flex-grow-1">
                  <div
                    v-for="n in maxSegments"
                    :key="n"
                    class="rounded"
                    style="height: 16px; flex: 0 0 20px"
                    :style="{
                      backgroundColor:
                        n <= Math.ceil(stat.value / 20) ? '#4895ef' : '#333',
                    }"
                  ></div>
                </div>

                <!-- simple progress bar: mobile only -->
                <div class="d-flex d-md-none flex-grow-1">
                  <div class="progress flex-grow-1" style="height: 16px">
                    <div
                      class="progress-bar"
                      :style="{
                        width: `${(stat.value / 500) * 100}%`,
                        backgroundColor: '#4895ef',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";

const maxSegments = 25;

const route = useRoute();
const coromon = ref(null);
const isLoading = ref(true);
const total = ref(0);
const variant = ref("standard");

const stats = computed(() => [
  { label: "HP", value: coromon.value.hp },
  { label: "Attack", value: coromon.value.attack },
  { label: "SP Attack", value: coromon.value.spattack },
  { label: "Defense", value: coromon.value.defense },
  { label: "SP Defense", value: coromon.value.spdefense },
  { label: "Speed", value: coromon.value.speed },
  { label: "SP", value: coromon.value.sp },
]);

const fetchCoromon = async (id) => {
  isLoading.value = true;
  variant.value = "standard";
  const response = await fetch(`https://coromonapi.onrender.com/coromon/${id}`);
  const json = await response.json();
  coromon.value = json.data;
  isLoading.value = false;
};

onMounted(async () => {
  const totalResponse = await fetch("https://coromonapi.onrender.com/coromon");
  const totalJson = await totalResponse.json();
  total.value = totalJson.total;
  fetchCoromon(route.params.id);
});

watch(
  () => route.params.id,
  (newId) => fetchCoromon(newId),
);
</script>

<style scoped>
.detail-card {
  border: 4px solid transparent;
  transition: box-shadow 0.2s ease;
}

.type-ice {
  border-color: #90e0ef;
  box-shadow: 0 0 16px #90e0ef55;
}
.type-fire {
  border-color: #f4731c;
  box-shadow: 0 0 16px #f4731c55;
}
.type-water {
  border-color: #4895ef;
  box-shadow: 0 0 16px #4895ef55;
}
.type-normal {
  border-color: #adb5bd;
  box-shadow: 0 0 16px #adb5bd55;
}
.type-electric {
  border-color: #f9c74f;
  box-shadow: 0 0 16px #f9c74f55;
}
.type-ghost {
  border-color: #7b2d8b;
  box-shadow: 0 0 16px #7b2d8b55;
}
.type-sand {
  border-color: #d4a017;
  box-shadow: 0 0 16px #d4a01755;
}
.type-crimsonite {
  border-color: #e63946;
  box-shadow: 0 0 16px #e6394655;
}

.variant-btn {
  height: 48px;
}

@media (max-width: 576px) {
  .variant-btn {
    height: 36px;
  }
}
</style>
