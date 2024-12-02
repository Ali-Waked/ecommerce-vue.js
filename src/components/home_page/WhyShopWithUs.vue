<template>
  <div class="shop-with-us py-12">
    <div class="title">
      <h2 class="text-center"><span>Why Shop</span> With Us</h2>
    </div>
    <v-container fluid>
      <v-row class="pt-4">
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            elevation="0"
            class="text-center bg-transparent text-white mb-5"
          >
            <div class="img-parent">
              <img src="@/assets/images/free-shipping.png" alt="" />
            </div>
            <v-card-title
              style="
                white-space: pre-wrap;
                line-height: 1.2;
                font-weight: 700;
                font-size: 20px;
              "
            >
              Free Shipping On First Order
            </v-card-title>
            <v-card-text
              style="
                color: #ddd;
                padding-bottom: 0;
                padding-top: 6px;
                font-size: 15px;
              "
              >Lorem ipsm dolor sit amet consecteur</v-card-text
            >
            <a
              href="#"
              class="text-white"
              style="font-weight: 600; font-size: 15px"
              >Learn More</a
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            elevation="0"
            class="text-center bg-transparent text-white mb-5"
          >
            <div class="img-parent">
              <img src="@/assets/images/weekly-flash-sales.png" alt="" />
            </div>
            <v-card-title
              style="
                white-space: pre-wrap;
                line-height: 1.2;
                font-weight: 700;
                font-size: 20px;
              "
            >
              Weekly Flash Sale
            </v-card-title>
            <v-card-text
              style="
                color: #ddd;
                padding-bottom: 0;
                padding-top: 6px;
                font-size: 15px;
              "
              >Lorem ipsm dolor sit amet consecteur</v-card-text
            >
            <a
              href="#"
              class="text-white"
              style="font-weight: 600; font-size: 15px"
              >Learn More</a
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3">
          <v-card
            elevation="0"
            class="text-center bg-transparent text-white mb-5"
          >
            <div class="img-parent">
              <img src="@/assets/images/discount.png" alt="" />
            </div>
            <v-card-title
              style="
                white-space: pre-wrap;
                line-height: 1.2;
                font-weight: 700;
                font-size: 20px;
              "
            >
              Anula Payment Discount
            </v-card-title>
            <v-card-text
              style="
                color: #ddd;
                padding-bottom: 0;
                padding-top: 6px;
                font-size: 15px;
              "
              >Lorem ipsm dolor sit amet consecteur</v-card-text
            >
            <a
              href="#"
              class="text-white"
              style="font-weight: 600; font-size: 15px"
              >Learn More</a
            >
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="">
          <v-card
            elevation="0"
            class="text-center bg-transparent text-white mb-5"
          >
            <div class="img-parent">
              <img src="@/assets/images/cash-back.png" alt="" />
            </div>
            <v-card-title
              style="
                white-space: pre-wrap;
                line-height: 1.2;
                font-weight: 700;
                font-size: 20px;
              "
            >
              Cashback Reward Program
            </v-card-title>
            <v-card-text
              style="
                color: #ddd;
                padding-bottom: 0;
                padding-top: 6px;
                font-size: 15px;
              "
              >Lorem ipsm dolor sit amet consecteur</v-card-text
            >
            <a
              href="#"
              class="text-white"
              style="font-weight: 600; font-size: 15px"
              >Learn More</a
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.shop-with-us {
  background-image: url("../../assets/images/why-shop-with-us-banner.webp");
  background-repeat: repeat-x;
  background-size: cover;
  h2 {
    color: white;
    font-size: 45px;
    font-weight: 900;
    span {
      color: rgb(45 251 223);
    }
  }
}

@media (max-width: 599px) {
  .shop-with-us {
    background-image: url("../../assets/images/why-shop-with-us-banner.webp");
    background-repeat: repeat;
    /* background-size: cover; */
    h2 {
      color: white;
      font-size: 25px;
      font-weight: 900;
      span {
        color: rgb(45 251 223);
      }
    }
  }
}
</style>
