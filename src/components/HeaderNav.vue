<template>
  <nav class="navbar navbar-expand-lg sticky-top bg-body-tertiary">
    <div class="container-sm container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        @click="isNavOpen = !isNavOpen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        :class="{ show: isNavOpen }"
        id="navbarNav"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" href="#"
              ><img
                src="/coromonimage/icons/home.png"
                style="image-rendering: pixelated"
              />
              <span class="fw-bold"> Home</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/database" class="nav-link" href="#"
              ><img
                src="/coromonimage/icons/database.png"
                style="image-rendering: pixelated"
              />
              <span class="fw-bold"> Database</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/teambuilder" class="nav-link" href="#"
              ><img
                src="/coromonimage/icons/teambuilder.png"
                style="image-rendering: pixelated"
              />
              <span class="fw-bold"> Team Builder</span>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div
          class="api-status-dot"
          :class="apiStatus"
          :title="apiStatusText"
        ></div>
        <button class="btn btn-light" @click="toggleDarkMode">
          <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isNavOpen = ref(false);

router.afterEach(() => {
  isNavOpen.value = false;
});

const isDark = ref(localStorage.getItem("theme") === "dark");

document.documentElement.setAttribute(
  "data-bs-theme",
  isDark.value ? "dark" : "light",
);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  const theme = isDark.value ? "dark" : "light";

  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem("theme", theme);
};

const apiStatus = ref("status-loading");
const apiStatusText = ref("Connecting to API...");

const checkApi = async () => {
  try {
    const res = await fetch("https://coromonapi.onrender.com/coromon?limit=1");

    if (res.ok) {
      apiStatus.value = "status-online";
      apiStatusText.value = "API is online";
    } else {
      apiStatus.value = "status-offline";
      apiStatusText.value = "API is down";
    }
  } catch {
    apiStatus.value = "status-offline";
    apiStatusText.value = "API is unreachable";
  }
};

onMounted(() => checkApi());
</script>

<style scoped>
.api-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: help;
  transition: background-color 0.3s ease;
}

.status-loading {
  background-color: orange;
}
.status-online {
  background-color: #4ade80;
}
.status-offline {
  background-color: #ef4444;
}
</style>
