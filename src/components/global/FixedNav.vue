<template>
  <div class="fixed-nav">
    <v-app-bar color="#02218f">
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <img
              class="w-50 cursor-pointer"
              src="@/assets/images/logo.png"
              alt="logo"
              @click="$router.push({ name: 'home' })"
            />
          </v-col>
          <v-col cols="7">
            <ul
              class="links d-flex text-white justify-space-between"
              style="list-style: none"
            >
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
          <v-col
            cols="3"
            style="gap: 20px"
            class="d-flex justify-end align-center"
          >
            <Magnify
              class="position-absolute mr-12"
              style="right: 12px"
              width="23px"
              fill="#fff"
            />
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
                color="red"
                offset-x="-14"
                v-if="cartItems.length"
              ></v-badge>
              <Cart style="width: 28px" fill="#fff" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { cartStore } from "@/stores/cart";
import Cart from "../icons/Cart.vue";
import Magnify from "../icons/Magnify.vue";
import { productsModule } from "@/stores/products";
import { mapState } from "pinia";

export default {
  inject: ["Emitter"],
  data: () => ({}),
  components: {
    Magnify,
    Cart,
  },
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
