<template>
  <div class="nav-bar">
    <v-app-bar color="#02218f" class="pt-3" height="fit-content" absolute>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <img
              src="@/assets/images/logo.png"
              alt=""
              class="cursor-pointer"
              @click="$router.push({ name: 'home' })"
            />
          </v-col>
          <v-col cols="5">
            <div class="position-relative" style="width: 90%">
              <input
                type="search"
                name="navSearch"
                id="navSearch"
                placeholder="Search the store"
                style="width: 100%; border-radius: 30px; outline: none"
                class="py-3 px-5 bg-white"
              />
              <Magnify
                class="position-absolute"
                style="right: 12px"
                width="23px"
                fill="#666"
              />
            </div>
          </v-col>
          <v-col cols="4" class="ps-8">
            <div
              class="parent text-white d-flex align-center justify-space-between"
            >
              <div class="available">
                <span>Available 24/7 at</span>
                <br />
                <strong>(090) 123-4567</strong>
              </div>
              <div
                class="wishlists d-flex flex-column align-center cursor-pointer"
              >
                <Heart style="width: 28px" fill="#ffb547" />
                <span style="color: #ffb547" class="mt-1">Wish Lists</span>
              </div>
              <div
                class="wishlists d-flex flex-column align-center cursor-pointer"
              >
                <Account style="width: 28px" fill="#ffb547" />
                <span style="color: #ffb547" class="mt-1">Sign in</span>
              </div>
              <div
                class="wishlists d-flex flex-column align-center cursor-pointer"
                @click="openCart"
                :style="`pointer-events: ${
                  $route.name == 'cart_page' ? 'none' : 'unset'
                }`"
              >
                <v-badge
                  location="right top"
                  :content="cartItems.length"
                  color="#205dc2"
                  offset-x="-14"
                  v-if="cartItems.length"
                ></v-badge>
                <Cart style="width: 28px" fill="#ffb547" />
                <span style="color: #ffb547" class="mt-1">Cart</span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <ul class="links d-flex text-white justify-space-between">
              <li v-for="category in categories" :key="category.title">
                <router-link
                  :to="{
                    name: 'products_category',
                    query: { category: category.route, title: category.title },
                  }"
                  class="text-white text-decoration-none"
                  >{{ category.title }}</router-link
                >
              </li>
            </ul>
          </v-col>
          <!-- <v-col cols="2"></v-col> -->
          <v-col cols="4" class="d-flex justify-end ga-8">
            <div class="help d-flex align-center ga-1 text-white">
              <Help width="20px" color="#2c64c1" />
              <span>Help</span>
            </div>
            <div
              id="language-btn"
              class="help d-flex align-center ga-1 text-white cursor-pointer"
            >
              <EnLang width="20px" v-if="selectedLang[0].lang == 'EN'" />
              <DeLang width="20px" v-if="selectedLang[0].lang == 'DE'" />
              <span
                >{{ selectedLang[0].lang }} /
                {{ selectedLang[0].currency }}</span
              >
              <v-icon>mdi-chevron-down</v-icon>
              <v-menu activator="#language-btn">
                <v-list v-model:selected="selectedLang" mandatory>
                  <v-list-item
                    v-for="lang in langs"
                    :key="lang.lang"
                    :value="lang"
                  >
                    <v-list-item-title class="d-flex ga-2 align-center">
                      <EnLang width="20px" v-if="lang.lang == 'EN'" />
                      <DeLang width="20px" v-if="lang.lang == 'DE'" />
                      <span>{{ lang.lang }} / {{ lang.currency }}</span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-app-bar-nav-icon  /> -->
    </v-app-bar>
  </div>
</template>

<script>
import Heart from "@/components/icons/Heart.vue";
import Account from "@/components/icons/Account.vue";
import Cart from "@/components/icons/Cart.vue";
import Help from "@/components/icons/Help.vue";
import EnLang from "@/components/icons/EnLang.vue";
import DeLang from "@/components/icons/DeLang.vue";
import Magnify from "@/components/icons/Magnify.vue";
import { productsModule } from "@/stores/products";
import { mapState } from "pinia";
import { cartStore } from "@/stores/cart";
export default {
  inject: ["Emitter"],
  components: {
    Heart,
    Account,
    Cart,
    Help,
    EnLang,
    DeLang,
    Magnify,
  },
  data: () => ({
    selectedLang: [
      {
        lang: "EN",
        currency: "USD",
      },
    ],
    langs: [
      {
        lang: "EN",
        currency: "USD",
      },
      {
        lang: "DE",
        currency: "EURO",
      },
    ],
  }),
  computed: {
    ...mapState(productsModule, ["categories"]),
    ...mapState(cartStore, ["cartItems"]),
  },
  methods: {
    openCart() {
      this.Emitter.emit("openCart");
    },
  },
};
</script>
