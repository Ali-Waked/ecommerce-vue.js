<template>
  <div class="mt-16 quick-view">
    <v-dialog v-model="dialog" max-width="900" max-height="500">
      <v-icon
        icon="mdi-close"
        style="
          position: absolute;
          right: -14px;
          top: -14px;
          background-color: black;
          color: #eee;
          font-size: 18px;
          padding: 13px;
          z-index: 10;
          cursor: pointer;
        "
        @click="dialog = false"
      ></v-icon>
      <v-card elevation="0" class="content-card">
        <v-container fluid class="bg-white">
          <v-row>
            <v-col cols="12" md="7">
              <img
                :src="tab ? tab : product.thumbnail"
                alt=""
                height="400"
                v-if="!loading"
                class="mx-auto mx-md-0 w-100"
              />
              <v-skeleton-loader
                type="image, image, image"
                v-if="loading"
              ></v-skeleton-loader>
              <v-tabs v-model="tab" center-active height="130" class="mt-10">
                <v-tab
                  v-for="(image, i) in product.images"
                  :key="i"
                  :value="image"
                  class="mx-10"
                >
                  <img
                    :src="image"
                    alt="product_image"
                    width="70"
                    height="100"
                  />
                </v-tab>
              </v-tabs>
            </v-col>
            <v-col cols="12" sm="10" md="5" class="pt-0 pl-6">
              <v-skeleton-loader
                type="article, article, article, button"
                v-if="loading"
              ></v-skeleton-loader>
              <v-card elevation="0" v-if="!loading">
                <v-card-title
                  class="px-0"
                  style="
                    font-size: 19px;
                    font-weight: bold;
                    white-space: pre-wrap;
                  "
                >
                  ({{ product.title }}) Sample - {{ product.category }} For Sale
                </v-card-title>
                <div
                  class="rating-parent d-flex align-center ga-3 text-center text-md-left"
                >
                  <v-rating
                    v-model="product.rating"
                    half-increments
                    readonly
                    color="yellow-darken-2"
                    size="x-small"
                    density="compact"
                  ></v-rating>
                  <span
                    class="mt-1"
                    style="font-size: 13px; color: rgb(96, 96, 96)"
                    >Stock: {{ product.stock }}</span
                  >
                </div>
                <v-card-text
                  class="px-0 text-center text-md-left"
                  style="font-size: 13px; color: rgb(96, 96, 96)"
                >
                  {{ product.description }}</v-card-text
                >
                <v-card-text
                  class="px-0 text-center text-md-left"
                  style="font-size: 13px; color: rgb(96, 96, 96)"
                >
                  Brand: {{ product.brand }}</v-card-text
                >
                <v-card-text
                  class="px-0 text-center text-md-left"
                  style="font-size: 13px; color: rgb(96, 96, 96)"
                >
                  Availablity:
                  {{
                    product.stock > 0 ? "In Stock" : "Out Of Stock"
                  }}</v-card-text
                >
                <v-card-text class="pl-0 pt-0 text-center text-md-left">
                  <del>${{ product.price }}</del> From
                  <span class="" style="font-weight: 900; font-size: 16px"
                    >${{
                      Math.ceil(
                        product.price -
                          product.price * (product.discountPercentage / 100)
                      )
                    }}</span
                  >
                </v-card-text>
                <div
                  class="counter px-1 mx-auto mx-md-0"
                  style="
                    border-radius: 30px;
                    border: 1px solid rgb(201, 201, 201);
                    width: fit-content;
                  "
                >
                  <v-icon size="22" @click="quantity > 1 ? quantity-- : false"
                    >mdi-minus</v-icon
                  >
                  <input
                    type="number"
                    style="
                      border: none;
                      outline: none;
                      width: 60px;
                      font-size: 13px;
                    "
                    class="text-center py-3"
                    min="1"
                    v-model="quantity"
                  />
                  <v-icon size="22" @click="quantity++">mdi-plus</v-icon>
                </div>
                <v-card-text class="pl-0 pt-0 mt-2 text-center text-md-left">
                  Subtotal: ${{
                    Math.ceil(
                      product.price -
                        product.price * (product.discountPercentage / 100)
                    ) * quantity
                  }}
                </v-card-text>
                <v-card-actions class="w-100">
                  <v-btn
                    variant="outlined"
                    style="
                      text-transform: none;
                      border-radius: 30px;
                      background-color: rgb(34, 34, 34);
                    "
                    class="w-75 text-white mx-auto mx-md-0"
                    height="45"
                    @click="addToCart(product)"
                    :loading="btnLoading"
                    >Add To Cart</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { cartStore } from "@/stores/cart";
import { mapActions } from "pinia";
export default {
  inject: ["Emitter"],
  data: () => ({
    tab: "",
    quantity: 1,
    loading: false,
    dialog: false,
    product: "",
    btnLoading: false,
  }),
  computed: {},
  methods: {
    ...mapActions(cartStore, ["addItem"]),
    addToCart(item) {
      item.quantity = this.quantity;
      this.addItem(item);
      this.quantity = 1;
      this.btnLoading = true;
      setTimeout(() => {
        this.btnLoading = false;
        this.Emitter.emit("openCart");
        this.Emitter.emit("showMsg", item.title);
        this.dialog = false;
      }, 1000);
    },
  },
  mounted() {
    this.Emitter.on("openQuikView", (data) => {
      this.loading = true;
      this.dialog = true;
      this.product = data;
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    });
  },
};
</script>

<style lang="scss">
.content-card {
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    background-color: rgb(149, 149, 149);
  }
  &::-webkit-scrollbar-track {
    width: 5px;
    background-color: rgb(200, 200, 200);
  }
}
</style>
