<template>
  <div class="products-swiper pt-16 px-5">
    <div class="title mb-10 px-5 d-flex justify-space-between align-center">
      <h2
        style="font-weight: 900; font-size: 30px"
        :class="`text-${titleColor}`"
      >
        {{ title }}
      </h2>
      <router-link
        class="text-black"
        style="font-size: 14px"
        :to="{
          name: 'products_category',
          query: {
            title: categories[index].title,
            category: categories[index].route,
          },
        }"
        >Shop All</router-link
      >
    </div>
    <v-container fluid v-if="!products.length">
      <v-row>
        <v-col cols="12" class="pt-16">
          <v-row>
            <v-col cols="12" sm="6" md="3" v-for="num in numbers" :key="num">
              <v-skeleton-loader
                type="image, article, button"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Swiper
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :modules="modules"
      :slides-per-view="4"
      :space-between="35"
      class="pb-10"
      :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
      :autoplay="{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :loop="false"
      :breakpoints="breakpoints"
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
                  shownItem[item.title] ? shownItem[item.title] : item.thumbnail
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
            <!-- ({{ item.title }})
            {{
              item.description.split(" ").length <= 8
                ? item.description
                : item.description.split(" ").slice(0, 8).join(" ") + "..."
            }} -->
            {{
              `(${item.title}) ${item.description}`.length <= 57
                ? `(${item.title}) ${item.description}`
                : `(${item.title}) ${item.description}`.substring(0, 57) + "..."
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
              class="text-center text-sm-left"
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
              class="py-2 px-12 mx-auto"
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
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { VSkeletonLoader } from "vuetify/lib/components/index.mjs";
import { productsModule } from "@/stores/products";
import { mapState } from "pinia";
export default {
  inject: ["Emitter"],
  props: {
    products: {
      type: Array,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleColor: {
      type: String,
      default: "black",
    },
    index: {
      type: Number,
    },
  },
  setup() {
    return { modules: [Pagination, Navigation, Autoplay] };
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
      990: {
        slidesPerView: 4,
      },
    },
    numbers: 4,
  }),
  computed: {
    ...mapState(productsModule, ["categories"]),
  },
  methods: {
    openQuikView(product) {
      this.Emitter.emit("openQuikView", product);
    },
    resizeWindow() {
      if (window.innerWidth < 960 && window.innerWidth >= 600) {
        this.numbers = 2;
      } else if (window.innerWidth < 600) {
        this.numbers = 1;
      } else {
        this.numbers = 4;
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

<style lang="scss">
.products-swiper {
  .swiper-button-next,
  .swiper-button-prev {
    width: 35px;
    height: 35px;
    border: 2px solid rgb(95, 95, 95);
    border-radius: 50%;
    background-color: white;
    top: 43%;
    &::after {
      font-size: 13px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(53, 53, 53);
      font-weight: 900;
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }
  .img-parent:hover {
    .quick-view-btn {
      opacity: 1 !important;
    }
  }
}
@media (max-width: 580px) {
  .img-parent {
    height: 300px !important;
  }
  .swiper-button-next,
  .swiper-button-prev {
    top: 56%;
  }
}
</style>
