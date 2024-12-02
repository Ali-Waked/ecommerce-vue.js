<template>
  <UpperBanner />
  <TheFeatures />
  <TopOffers />
  <ProductsComponent
    :products="flashDeals"
    title="Flash Deals"
    title-color="red"
    :index="0"
  />
  <TopCats />
  <NewProducts :products="newProducts" :index="1" />
  <QualityFeatures />
  <ProductsComponent
    :products="smartPhone"
    title="Top Mobile Phones"
    :index="0"
  />
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" class="pr-3 pr-md-5">
        <img src="@/assets/images/band-left-cover.webp" alt="" class="w-100" />
      </v-col>
      <v-col cols="6" class="pl-5 d-none d-md-block">
        <img src="@/assets/images/band-right-cover.webp" alt="" class="w-100" />
      </v-col>
    </v-row>
  </v-container>
  <ProductsComponent :products="fragrances" title="Top Fragrances" :index="3" />
  <img
    src="@/assets/images/tv-banner.webp"
    class="w-100 d-none d-sm-block"
    alt=""
  />
  <ProductsComponent :products="groceries" title="Top Groceries" :index="6" />
  <WhyShopWithUs />
</template>

<script>
import TheFeatures from "@/components/home_page/TheFeatures.vue";
import UpperBanner from "@/components/home_page/UpperBanner.vue";
import TopOffers from "@/components/home_page/TopOffers.vue";
import ProductsComponent from "@/components/home_page/ProductsSwiper.vue";
import TopCats from "@/components/home_page/TopCategories.vue";
import NewProducts from "@/components/home_page/NewProducts.vue";
import QualityFeatures from "@/components/home_page/QualityFeatures.vue";
import WhyShopWithUs from "@/components/home_page/WhyShopWithUs.vue";
import { productsModule } from "@/stores/products";
import { mapActions, mapState } from "pinia";

export default {
  name: "HomeView",
  components: {
    UpperBanner,
    TheFeatures,
    TopOffers,
    ProductsComponent,
    TopCats,
    NewProducts,
    QualityFeatures,
    WhyShopWithUs,
  },
  computed: {
    ...mapState(productsModule, [
      "flashDeals",
      "newProducts",
      "smartPhone",
      "fragrances",
      "groceries",
    ]),
  },
  methods: {
    ...mapActions(productsModule, ["getProducts"]),
  },
  async mounted() {
    await this.getProducts();
    // console.log(this.flashDeals.filter((el) => el.category == "laptops"));
    // fetch("https://dummyjson.com/products/categories")
    //   .then((res) => res.json())
    //   .then(console.log);
    // console.log(this.flashDeals.map((el) => el.category == 'laptops'))
    // console.log(this.newProducts);
  },
};
</script>
