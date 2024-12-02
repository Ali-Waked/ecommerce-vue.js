import { defineStore } from "pinia";
import axios from "axios";
export const productsModule = defineStore("productsModule", {
  state: () => ({
    flashDeals: [],
    newProducts: [],
    smartPhone: [],
    fragrances: [],
    groceries: [],
    categoryProducts: [],
    singleProduct: "",
    categories: [
      {
        title: "Smart Phones",
        route: "smartphones",
      },
      {
        title: "Laptops",
        route: "laptops",
      },
      {
        title: "Furniture",
        route: "furniture",
      },
      {
        title: "Fragrances",
        route: "fragrances",
      },
      {
        title: "Men's Watches",
        route: "mens-watches",
      },
      {
        title: "Women's Bags",
        route: "womens-bags",
      },
      {
        title: "Groceries",
        route: "groceries",
      },
    ],
  }),
  actions: {
    async getProducts() {
      await axios
        .get("https://dummyjson.com/products")
        .then((res) => {
          // this.newProducts = res.data.products.filter(
          //   (el) => el.category === "aptops"
          // );
          this.flashDeals = res.data.products.slice(0, 8);
        })
        .catch((err) => console.log(err));
      await axios
        .get("https://dummyjson.com/products/category/laptops")
        .then((res) => {
          this.newProducts = res.data.products.slice(0, 8);
        })
        .catch((err) => console.log(err));
      await axios
        .get("https://dummyjson.com/products/category/smartphones")
        .then((res) => {
          this.smartPhone = res.data.products.slice(0, 8);
        })
        .catch((err) => console.log(err));
      await axios
        .get("https://dummyjson.com/products/category/fragrances")
        .then((res) => {
          this.fragrances = res.data.products.slice(0, 8);
        })
        .catch((err) => console.log(err));
      await axios
        .get("https://dummyjson.com/products/category/groceries")
        .then((res) => {
          this.groceries = res.data.products.slice(0, 8);
        })
        .catch((err) => console.log(err));
    },
    async getProductsByCategory(category) {
      await axios(`https://dummyjson.com/products/category/${category}`)
        .then((res) => {
          this.categoryProducts = res.data.products;
          console.log(this.categoryProducts);
        })
        .catch((err) => console.log(err));
    },
    async getSingleProduct(productId) {
      await axios(`https://dummyjson.com/products/${productId}`)
        .then((res) => {
          this.singleProduct = res.data;
        })
        .catch((err) => console.log(err));
    },
  },
});
