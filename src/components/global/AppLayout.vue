<template>
  <div class="layout">
    <v-layout class="position-relative">
      <CartDrawer />
      <MenuDrawer />
      <v-main
        class="main-component"
        :style="` margin-top: ${
          $route.name == 'checkout'
            ? '0px'
            : windowWidth <= 990
            ? '60px'
            : '148px'
        }; padding-bottom: ${
          $route.name == 'checkout' ? '0px' : 'auto'
        } !important`"
      >
        <slot></slot>
      </v-main>
      <AppNav
        v-show="$route.name != 'checkout' && !showFixed && windowWidth > 990"
      />
      <ResponsiveNav v-show="windowWidth <= 990 && $route.name != 'checkout'" />
      <FixedNav
        v-show="$route.name != 'checkout' && showFixed && windowWidth > 990"
      />
      <AppFooter v-show="$route.name != 'checkout'" />
    </v-layout>
  </div>
</template>

<script>
import CartDrawer from "./CartDrawer.vue";
import AppNav from "./AppNav.vue";
import AppFooter from "./AppFooter.vue";
import FixedNav from "./FixedNav.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import MenuDrawer from "./MenuDrawer.vue";

export default {
  data: () => ({
    drawer: false,
    showFixed: false,
  }),
  components: {
    CartDrawer,
    AppNav,
    AppFooter,
    FixedNav,
    ResponsiveNav,
    MenuDrawer,
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
    window.onscroll = () => {
      if (window.scrollY >= 205) {
        this.showFixed = true;
      } else {
        this.showFixed = false;
      }
    };
  },
};
</script>

<style>
@media (min-width: 1120px) {
  .main-component {
    padding-bottom: 360px !important;
  }
}
@media (max-width: 1120px) {
  .main-component {
    padding-bottom: 620px !important;
  }
}
@media (max-width: 959px) {
  .main-component {
    padding-bottom: 670px !important;
  }
}
@media (max-width: 599px) {
  .main-component {
    padding-bottom: 1230px !important;
  }
}
</style>
