<template>
  <div class="container-sm mt-3">
    <h2 class="fw-bold mb-4">Team Builder</h2>

    <!-- Slots -->
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-4" v-for="(slot, index) in team" :key="index">
        <div class="p-2 rounded bg-secondary-subtle">
          <div class="small text-muted fw-bold mb-1">Slot {{ index + 1 }}</div>
          <select class="form-select form-select-sm" v-model="team[index]">
            <option value="">— empty —</option>
            <option
              v-for="coromon in coromons"
              :key="coromon.id"
              :value="coromon"
            >
              {{ coromon.name }}
            </option>
          </select>
          <div v-if="slot" class="d-flex align-items-center gap-2 mt-2">
            <img
              :src="`/coromonimage/icons/${slot.name.toLowerCase()}.webp`"
              style="
                image-rendering: pixelated;
                height: 32px;
                object-fit: contain;
              "
            />
            <span
              class="small fw-bold"
              :style="{ color: typeColors[slot.element_type] }"
            >
              {{ slot.element_type }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Type Chart -->
    <div class="overflow-auto">
      <table
        class="table table-bordered table-sm text-center"
        style="font-size: 12px"
      >
        <thead>
          <tr>
            <th class="text-start" style="font-size: 10px">atk ↓ / def →</th>
            <th
              v-for="def in activeDefTypes"
              :key="def.index"
              :style="{ color: typeColors[def.type] }"
            >
              {{ def.type }}
            </th>
            <th class="text-danger">Weaknesses</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="atk in ATK_TYPES" :key="atk">
            <th class="text-start" :style="{ color: typeColors[atk] }">
              {{ atk }}
            </th>
            <td
              v-for="def in activeDefTypes"
              :key="def.index"
              :class="getCellClass(atk, def.type)"
            >
              {{ getEffectiveness(atk, def.type) }}
            </td>
            <td class="fw-bold text-danger">
              {{
                activeDefTypes.filter((def) => chart[atk][def.type] === 2)
                  .length
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const coromons = ref([]);
const team = ref(["", "", "", "", "", ""]);

const DEF_TYPES = [
  "Normal",
  "Electric",
  "Ghost",
  "Sand",
  "Fire",
  "Ice",
  "Water",
  "Crimsonite",
];
const ATK_TYPES = [
  "Normal",
  "Electric",
  "Ghost",
  "Sand",
  "Fire",
  "Ice",
  "Water",
  "Magic",
  "Foul",
  "Heavy",
  "Air",
  "Poison",
  "Cut",
  "Crimsonite",
];

const typeColors = {
  Normal: "#adb5bd",
  Electric: "#f9c74f",
  Ghost: "#7b2d8b",
  Sand: "#d4a017",
  Fire: "#f4731c",
  Ice: "#90e0ef",
  Water: "#4895ef",
  Crimsonite: "#e63946",
  Magic: "#a78bfa",
  Foul: "#6b7280",
  Heavy: "#78716c",
  Air: "#bae6fd",
  Poison: "#4ade80",
  Cut: "#fca5a5",
};

const chart = {};
ATK_TYPES.forEach((atk) => {
  chart[atk] = {};
  DEF_TYPES.forEach((def) => {
    chart[atk][def] = 1;
  });
});

function set(atk, def, val) {
  chart[atk][def] = val;
}

set("Normal", "Ghost", 0.5);
set("Normal", "Crimsonite", 0.5);
set("Electric", "Electric", 0.5);
set("Electric", "Sand", 0.5);
set("Electric", "Crimsonite", 0.5);
set("Electric", "Water", 2);
set("Ghost", "Normal", 0.5);
set("Ghost", "Crimsonite", 0.5);
set("Ghost", "Ghost", 2);
set("Sand", "Sand", 0.5);
set("Sand", "Water", 0.5);
set("Sand", "Crimsonite", 0.5);
set("Sand", "Electric", 2);
set("Fire", "Fire", 0.5);
set("Fire", "Water", 0.5);
set("Fire", "Crimsonite", 0.5);
set("Fire", "Ice", 2);
set("Ice", "Fire", 0.5);
set("Ice", "Ice", 0.5);
set("Ice", "Crimsonite", 0.5);
set("Ice", "Water", 2);
set("Water", "Electric", 0.5);
set("Water", "Ice", 0.5);
set("Water", "Water", 0.5);
set("Water", "Crimsonite", 0.5);
set("Water", "Sand", 2);
set("Water", "Fire", 2);
set("Magic", "Crimsonite", 0.5);
set("Magic", "Ghost", 2);
set("Foul", "Sand", 0.5);
set("Foul", "Crimsonite", 0.5);
set("Foul", "Water", 2);
set("Heavy", "Fire", 0.5);
set("Heavy", "Crimsonite", 0.5);
set("Heavy", "Ice", 2);
set("Air", "Ice", 0.5);
set("Air", "Crimsonite", 0.5);
set("Air", "Fire", 2);
set("Poison", "Ice", 0.5);
set("Poison", "Crimsonite", 0.5);
set("Poison", "Normal", 2);
set("Cut", "Ghost", 0.5);
set("Cut", "Crimsonite", 0.5);
set("Cut", "Electric", 2);

const activeDefTypes = computed(() => {
  const teamTypes = team.value
    .filter((s) => s !== "")
    .map((s, i) => ({ type: s.element_type, index: i }));
  return teamTypes.length > 0
    ? teamTypes
    : DEF_TYPES.map((t, i) => ({ type: t, index: i }));
});

function getEffectiveness(atk, def) {
  const val = chart[atk][def];
  return val === 2 ? "2×" : val === 0.5 ? "½×" : "1×";
}

function getCellClass(atk, def) {
  const val = chart[atk][def];
  if (val === 2) return "table-success";
  if (val === 0.5) return "table-danger";
  return "";
}

watch(
  team,
  (newTeam) => {
    const ids = newTeam.map((s) => (s ? s.id : ""));
    localStorage.setItem("coromonTeam", JSON.stringify(ids));
  },
  { deep: true },
);

onMounted(async () => {
  let page = 1;
  let allData = [];
  while (true) {
    const res = await fetch(
      `https://coromonapi.onrender.com/coromon?page=${page}&limit=10`,
    );
    const json = await res.json();
    allData = [...allData, ...json.data];
    if (allData.length >= json.total) break;
    page++;
  }
  coromons.value = allData;

  const saved = localStorage.getItem("coromonTeam");
  if (saved) {
    const ids = JSON.parse(saved);
    team.value = ids.map((id) =>
      id ? allData.find((c) => c.id === id) || "" : "",
    );
  }
});
</script>
