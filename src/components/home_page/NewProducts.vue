<template>
  <div class="new-product pt-12">
    <div class="title mb-10 px-5 d-flex justify-space-between align-center">
      <h2 style="font-weight: 900; font-size: 30px" class="text-black">
        New Products
      </h2>
      <a href="#" class="text-black" style="font-size: 14px">Shop All</a>
    </div>
    <v-row class="flex-column-reverse flex-md-row px-6 px-md-0">
      <v-col cols="12" md="7" class="pt-4 pt-md-16" v-if="!products.length">
        <v-row>
          <v-col :cols="colsNumber" v-for="num in numbers" :key="num">
            <v-skeleton-loader
              type="image, article, button"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="7" class="pt-4 pt-md-16" v-else>
        <Swiper
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :modules="modules"
          :slides-per-view="3"
          :space-between="20"
          :breakpoints="breakpoints"
          class="pb-10"
        >
          <swiper-slide v-for="item in products" :key="item.id">
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
                    width="80"
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
              <v-card-text class="pl-0 pt-0 text-center text-sm-left">
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
                <span class="text-red" style="font-weight: 900; font-size: 16px"
                  >${{
                    Math.ceil(
                      item.price - item.price * (item.discountPercentage / 100)
                    )
                  }}</span
                >
              </v-card-text>
              <v-card-text class="pl-0 pb-1 text-center text-sm-left">
                <v-btn-toggle v-model="shownItem[item.title]" mandatory>
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
          </swiper-slide>
          <div class="swiper-prev"></div>
          <div class="swiper-next"></div>
          <div class="swiper-pagination"></div>
        </Swiper>
      </v-col>
      <v-col cols="12" md="5" class="text-center text-md-right">
        <img
          src="@/assets/images/vr-banner.webp"
          class="w-100 w-sm-75 w-md-100"
          alt=""
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
export default {
  inject: ["Emitter"],
  props: {
    products: {
      type: Array,
      require: true,
    },
    index: {
      type: Number,
    },
  },
  setup() {
    return { modules: [Pagination] };
  },
  components: {
    Swiper,
    SwiperSlide,
    VSkeletonLoader,
  },
  data: () => ({
    shownItem: {},
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      580: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      960: {
        slidesPerView: 2,
      },
      1130: {
        slidesPerView: 3,
      },
    },
    numbers: 3,
    colsNumber: 4,
  }),
  methods: {
    openQuikView(product) {
      this.Emitter.emit("openQuikView", product);
    },
    resizeWindow() {
      if (window.innerWidth < 980 && window.innerWidth >= 600) {
        this.numbers = 2;
        this.colsNumber = 6;
      } else if (window.innerWidth < 600) {
        this.numbers = 1;
        this.colsNumber = 12;
      } else {
        this.numbers = 3;
      }
    },
  },
  mounted() {
    this.resizeWindow();
    window.addEventListener("resize", this.resizeWindow());
    // console.log("products is ", this.products.products.slice(0, 8)[0]);
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
