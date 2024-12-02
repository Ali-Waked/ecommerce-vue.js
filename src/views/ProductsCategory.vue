<template>
  <v-progress-linear
    indeterminate
    color="#02218f"
    v-if="loading"
  ></v-progress-linear>
  <div class="products-category mt-10">
    <h1 class="text-center">{{ $route.query.title }}</h1>
    <v-container fluid>
      <v-card elevation="0" class="pt-5" min-height="700px">
        <v-row v-if="loading">
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="num in 8"
            :key="num"
            class="mb-4"
          >
            <v-skeleton-loader
              type="image, article, button"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="!loading">
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="item in categoryProducts"
            :key="item.id"
            class="px-5"
          >
            <v-lazy>
              <v-card elevation="0" class="pb-5">
                <v-hover v-slot="{ isHovering, props }">
                  <div
                    class="img-parent position-relative"
                    style="height: 200px; overflow: hidden"
                  >
                    <img
                      :src="
                        shownItem[item.title]
                          ? shownItem[item.title]
                          : item.thumbnail
                      "
                      alt=""
                      :style="`height: 100%; transition: 0.5s all ease-in-out; transform: scale(${
                        isHovering ? 1.05 : 1
                      })`"
                      class="w-100 cursor-pointer"
                      v-bind="props"
                    />
                    <v-btn
                      density="compact"
                      width="100"
                      height="35"
                      class="bg-white quick-view-btn opacity-0"
                      elevation="0"
                      color="black"
                      variant="outlined"
                      style="
                        text-transform: none;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        border-radius: 30px;
                        transition: 0.2 all ease-in-out;
                        font-size: 13px;
                      "
                      @click="openQuikView(item)"
                      >Quick View</v-btn
                    >
                  </div>
                </v-hover>
                <v-card-text class="pl-0 pb-1 text-center text-sm-left">
                  {{
                    `(${item.title}) ${item.description}`.length <= 40
                      ? `(${item.title}) ${item.description}`
                      : `(${item.title}) ${item.description}`.substring(0, 40) +
                        "..."
                  }}
                </v-card-text>
                <v-card-text class="pl-0 pb-1 text-center text-sm-left">
                  <v-rating
                    v-model="item.rating"
                    half-increments
                    readonly
                    color="yellow-darken-2"
                    size="x-small"
                    density="compact"
                  ></v-rating>
                </v-card-text>
                <v-card-text class="pl-0 pt-0 text-center text-sm-left">
                  <del>${{ item.price }}</del> From
                  <span
                    class="text-red"
                    style="font-weight: 900; font-size: 16px"
                    >${{
                      Math.ceil(
                        item.price -
                          item.price * (item.discountPercentage / 100)
                      )
                    }}</span
                  >
                </v-card-text>
                <v-card-text class="pl-0 pb-1 text-center text-sm-left">
                  <v-btn-toggle v-model="shownItem[item.title]">
                    <v-btn
                      v-for="(pic, i) in item.images"
                      :value="pic"
                      :key="i"
                      size="x-small"
                      rounded="xl"
                      :ripple="false"
                    >
                      <img
                        :src="pic"
                        alt=""
                        style="
                          width: 30px;
                          height: 30px;
                          border-radius: 50%;
                          border: 1px solid rgb(135, 135, 135);
                        "
                      />
                    </v-btn>
                  </v-btn-toggle>
                </v-card-text>
                <div class="mt-5 text-center text-sm-left">
                  <v-btn
                    density="combact"
                    class="py-2 px-12"
                    style="text-transform: none; border-radius: 30px"
                    variant="outlined"
                    @click="
                      $router.push({
                        name: 'product_details',
                        params: { productId: item.id },
                      })
                    "
                    >Chose Options</v-btn
                  >
                </div>
              </v-card>
            </v-lazy>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { productsModule } from "@/stores/products";
import { mapActions, mapState } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";

export default {
  inject: ["Emitter"],
  data: () => ({
    shownItem: {},
    loading: false,
  }),
  components: {
    VSkeletonLoader,
  },
  computed: {
    ...mapState(productsModule, ["categoryProducts"]),
  },
  methods: {
    ...mapActions(productsModule, ["getProductsByCategory"]),
    openQuikView(product) {
      this.Emitter.emit("openQuikView", product);
    },
  },
  watch: {
    async $route() {
      if (this.$route.name == "products_category") {
        document.documentElement.scrollTo(0, 0);
        this.loading = true;
        await this.getProductsByCategory(this.$route.query.category);
        this.loading = false;
      }
    },
  },
  async mounted() {
    if (!this.$route.query.category) {
      return this.$router.go(-1);
    }
    this.loading = true;
    console.log(this.$route, this.categoryProducts);
    await this.getProductsByCategory(this.$route.query.category);
    this.loading = false;
  },
};
</script>

<style>
.img-parent:hover {
  .quick-view-btn {
    opacity: 1 !important;
  }
}
</style>
