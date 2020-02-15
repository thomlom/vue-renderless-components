<template>
  <div class="p-10 max-w-2xl mx-auto">
    <v-select-renderless :items="items" :filter="filter" :onSelect="select">
      <template
        v-slot="{
          items,
          isOpen,
          value,
          clear,
          highlightedIndex,
          getInputProps,
          getInputEvents,
          getItemProps,
          getItemEvents,
          getLabelProps,
          getListProps
        }"
      >
        <div>
          <label v-bind="getLabelProps()" class="text-gray-800"
            >Sélectionner quelque chose</label
          >
          <div class="mt-2 flex justify-between">
            <input
              v-bind="getInputProps()"
              v-on="getInputEvents()"
              class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            />
            <button
              @click="clear"
              class="ml-2 border rounded-lg bg-gray-100 border-gray-300 p-2"
            >
              Clear
            </button>
          </div>
          <ul
            v-bind="getListProps()"
            v-show="isOpen"
            class="mt-4 border border-gray-300 rounded-lg"
          >
            <li
              v-for="(item, index) in items"
              :key="item"
              v-bind="getItemProps(index)"
              v-on="getItemEvents(index)"
              :class="{ 'bg-gray-200': index === highlightedIndex }"
              class="p-2"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </template>
    </v-select-renderless>
  </div>
</template>

<script>
import VSelectRenderless from "./VSelectRenderless";

export default {
  name: "app",
  data() {
    return {
      items: [
        "Neptunium",
        "Plutonium",
        "Americium",
        "Curium",
        "Berkelium",
        "Californium",
        "Einsteinium",
        "Fermium",
        "Mendelevium",
        "Nobelium",
        "Lawrencium",
        "Rutherfordium",
        "Dubnium",
        "Seaborgium",
        "Bohrium",
        "Hassium",
        "Meitnerium",
        "Darmstadtium",
        "Roentgenium",
        "Copernicium",
        "Nihonium",
        "Flerovium",
        "Moscovium",
        "Livermorium",
        "Tennessine",
        "Oganesson"
      ]
    };
  },
  components: {
    VSelectRenderless
  },
  methods: {
    select(item) {
      console.log(item);
    },
    filter(items, value) {
      return items.filter(item => !value || item.includes(value));
    }
  }
};
</script>
