<template>
  <div class="product-details mt-16">
    <v-container fluid>
      <v-row class="mb-4 mb-md-0">
        <v-col cols="12" md="7" class="text-center text-md-left">
          <img
            :src="tab ? tab : singleProduct.thumbnail"
            alt=""
            height="500"
            width="100%"
            v-if="!loading"
          />
          <v-skeleton-loader
            type="image, image, image"
            v-if="loading"
          ></v-skeleton-loader>
          <div class="pt-0 pl-6 text-center text-md-left">
            <v-tabs v-model="tab" center-active height="220" class="mt-10">
              <v-tab
                v-for="(image, i) in singleProduct.images"
                :key="i"
                :value="image"
                class="mx-10"
              >
                <img
                  :src="image"
                  alt="product_image"
                  width="100"
                  height="200"
                />
              </v-tab>
            </v-tabs>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="8"
          md="5"
          class="pt-0 pl-6 text-center text-md-left mx-auto mx-md-0"
        >
          <v-skeleton-loader
            type="article, article, article, button"
            v-if="loading"
          ></v-skeleton-loader>
          <v-card elevation="0" v-if="!loading">
            <v-card-title
              class="px-0"
              style="font-size: 19px; font-weight: bold"
            >
              ({{ singleProduct.title }}) Sample -
              {{ singleProduct.category }} For Sale
            </v-card-title>
            <div
              class="rating-parent d-flex align-center ga-3 text-center text-md-left"
            >
              <v-rating
                v-model="singleProduct.rating"
                half-increments
                readonly
                color="yellow-darken-2"
                size="x-small"
                density="compact"
              ></v-rating>
              <span class="mt-1" style="font-size: 13px; color: rgb(96, 96, 96)"
                >Stock: {{ singleProduct.stock }}</span
              >
            </div>
            <v-card-text
              class="px-0"
              style="font-size: 13px; color: rgb(96, 96, 96)"
            >
              {{ singleProduct.description }}</v-card-text
            >
            <v-card-text
              class="px-0"
              style="font-size: 13px; color: rgb(96, 96, 96)"
            >
              Brand: {{ singleProduct.brand }}</v-card-text
            >
            <v-card-text
              class="px-0"
              style="font-size: 13px; color: rgb(96, 96, 96)"
            >
              Availablity:
              {{
                singleProduct.stock > 0 ? "In Stock" : "Out Of Stock"
              }}</v-card-text
            >
            <v-card-text class="pl-0 pt-0">
              <del>${{ singleProduct.price }}</del> From
              <span class="" style="font-weight: 900; font-size: 16px"
                >${{
                  Math.ceil(
                    singleProduct.price -
                      singleProduct.price *
                        (singleProduct.discountPercentage / 100)
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
            <v-card-text class="pl-0 pt-0 mt-2">
              Subtotal: ${{
                Math.ceil(
                  singleProduct.price -
                    singleProduct.price *
                      (singleProduct.discountPercentage / 100)
                ) * quantity
              }}
            </v-card-text>
            <v-card-actions class="mt-7 w-100">
              <v-btn
                variant="outlined"
                style="
                  text-transform: none;
                  border-radius: 30px;
                  background-color: rgb(34, 34, 34);
                "
                class="w-75 text-white mx-auto mx-md-0"
                height="45"
                @click="addToCart(singleProduct)"
                :loading="btnLoading"
                >Add To Cart</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { cartStore } from "@/stores/cart";
import { productsModule } from "@/stores/products";
import { mapActions, mapState } from "pinia";
export default {
  inject: ["Emitter"],
  data: () => ({
    tab: "",
    quantity: 1,
    loading: false,
    btnLoading: false,
  }),
  computed: {
    ...mapState(productsModule, ["singleProduct"]),
  },
  methods: {
    ...mapActions(productsModule, ["getSingleProduct"]),
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
  async mounted() {
    this.loading = true;
    await this.getSingleProduct(this.$route.params.productId);
    this.loading = false;
  },
};
</script>
