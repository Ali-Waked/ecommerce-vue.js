<template>
  <div class="order-success">
    <v-dialog v-model="dialog" width="45%" persistent class="text-center">
      <v-card>
        <div class="text-center py-7">
          <v-icon
            size="75"
            color="green"
            style="
              background-color: #fff;
              width: 100px;
              height: 100px;
              border-radius: 50%;
              font-size: 76px;
              border: 1px solid green;
            "
            >mdi-check</v-icon
          >
        </div>
        <v-card-title style="font-size: 30px; font-weight: bold; color: #777"
          >Order Place Successfuly!
        </v-card-title>
        <v-card-text style="font-size: 17px; color: #999999"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quisquam
          enim, inventore sed mollitia laudantium odio at. Autem quia ab aperiam
          eligendi odio quam, dolor architecto quos porro ea!
          Vitae?</v-card-text
        >
        <v-card-actions class="mt-5 justify-center pb-6">
          <v-btn variant="elevated" color="blue" @click="resetData"
            >Got it!</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { cartStore } from "@/stores/cart";
import { mapActions } from "pinia";

export default {
  props: {
    popup: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    dialog: true,
  }),
  watch: {
    dialog(newValue) {
      if (!newValue) {
        setTimeout(() => {
          this.$emit("close_popup");
        }, 200);
      }
    },
  },
  methods: {
    ...mapActions(cartStore, ["resetItems"]),
    resetData() {
      this.resetItems();
      this.dialog = false;
      this.$router.push({ name: "home" });
    },
  },
  mounted() {
    this.dialog = this.popup;
  },
};
</script>
