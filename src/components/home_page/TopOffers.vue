<template>
  <div class="top-offers bg-grey-lighten-3 py-6">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="4" style="height: 290px">
          <v-hover v-slot="{ isHovering, props }">
            <div
              style="height: 100%; border-radius: 7px"
              class="parent mr-md-4 overflow-hidden"
              v-bind="props"
            >
              <img
                src="@/assets/images/playstations.webp"
                alt="playstations"
                :style="`width: 100%; height:100%; transition: 0.5s all ease-in-out; cursor: pointer; transform: ${
                  isHovering ? 'scale(1.05)' : 'scale(1)'
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="12" sm="6" md="4" style="height: 290px">
          <v-hover v-slot="{ isHovering, props }">
            <div
              style="height: 100%; border-radius: 7px"
              class="parent mr-md-2 ml-md-2 overflow-hidden width: 100%; height:100%;"
              v-bind="props"
            >
              <img
                src="@/assets/images/headset.webp"
                alt="headset"
                :style="`width: 100%; height:100%; transition: 0.5s all ease-in-out; cursor: pointer; transform: ${
                  isHovering ? 'scale(1.05)' : 'scale(1)'
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          style="height: 290px"
          class="center-element"
        >
          <v-hover v-slot="{ isHovering, props }">
            <div
              style="height: 100%; border-radius: 7px"
              class="parent ml-md-2 overflow-hidden"
              v-bind="props"
            >
              <img
                src="@/assets/images/chairs.webp"
                alt="charis"
                :style="`width: 100%; height:100%; transition: 0.5s all ease-in-out; cursor: pointer; transform: ${
                  isHovering ? 'scale(1.05)' : 'scale(1)'
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col cols="6" style="height: 460px" class="mt-md-3 cols-12">
          <v-hover v-slot="{ isHovering, props }">
            <div
              style="height: 100%; border-radius: 7px"
              class="parent overflow-hidden mr-md-3"
              v-bind="props"
            >
              <img
                src="@/assets/images/iphones.webp"
                alt="iphones"
                :style="`width: 100%; height:100%; transition: 0.5s all ease-in-out; cursor: pointer; transform: ${
                  isHovering ? 'scale(1.05)' : 'scale(1)'
                }`"
              />
            </div>
          </v-hover>
        </v-col>
        <v-col
          cols="6"
          style="height: 460px"
          class="mt-md-3 position-relative go-to-top cols-12"
        >
          <v-hover v-slot="{ isHovering, props }">
            <div
              style="height: 100%; border-radius: 7px"
              class="parent overflow-hidden ml-md-3"
              v-bind="props"
            >
              <img
                src="@/assets/images/laptops.webp"
                alt="laptops"
                :style="`width: 100%; height:100%; transition: 0.5s all ease-in-out; cursor: pointer; transform: ${
                  isHovering ? 'scale(1.05)' : 'scale(1)'
                }`"
              />
            </div>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
/* .parent {
  img:hover {
    transform: scale(1.05);
  }
} */
@media (min-width: 599px) {
}
@media (max-width: 959px) {
  .go-to-top {
    top: -170px;
  }
}
@media (max-width: 830px) {
  .cols-12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
  .go-to-top {
    top: 0px;
  }
  .center-element {
    margin: 0 auto;
  }
}
</style>
