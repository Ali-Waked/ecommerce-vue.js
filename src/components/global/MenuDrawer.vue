<template>
  <div class="menu-drawer">
    <v-navigation-drawer
      location="left"
      temporary
      v-model="drawer"
      width="370"
      class="px-5 pt-0 mnue-drawer"
    >
      <v-card elevation="0" class="px-0">
        <v-card-title
          class="pl-0 pr-2 d-flex justify-space-between align-center w-100"
          style="font-size: 17px; font-weight: bold"
          >Menu <v-icon @click="drawer = false">mdi-close</v-icon></v-card-title
        >
        <v-list>
          <v-list-item
            class="px-0"
            v-for="cat in categories"
            :key="cat.route"
            @click="
              $router.push({
                name: 'products_category',
                query: { title: cat.title, category: cat.route },
              })
            "
          >
            <v-list-item-title>{{ cat.title }}</v-list-item-title>
          </v-list-item>
          <v-list-group>
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="Language"
                class="px-0"
              ></v-list-item>
            </template>
            <v-list-item>
              <v-list-item-title class="d-flex align-center ga-2"
                ><EnLang width="20px" /> <span>English</span></v-list-item-title
              >
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="d-flex align-center ga-2">
                <DeLang width="20px" />
                <span>Deutsch</span>
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { productsModule } from "@/stores/products";
import { mapState } from "pinia";
import EnLang from "@/components/icons/EnLang.vue";
import DeLang from "@/components/icons/DeLang.vue";

export default {
  inject: ["Emitter"],
  data: () => ({
    drawer: false,
  }),
  components: {
    EnLang,
    DeLang,
  },
  computed: {
    ...mapState(productsModule, ["categories"]),
  },
  mounted() {
    this.Emitter.on("openMenu", () => {
      this.drawer = true;
    });
  },
};
</script>
