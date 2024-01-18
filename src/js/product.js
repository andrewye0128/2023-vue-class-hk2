const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      authURL: "https://vue3-course-api.hexschool.io/v2",
      path: "hao-ye",
      tempProduct: {},
      products: [],
    };
  },
  methods: {
    async checkAdmin() {
      const url = `${this.authURL}/api/user/check`;

      try {
        await axios.post(url);
        this.getProducts();
      } catch (err) {
        console.log(err);
        alert(err.response.data.message);
      }
    },
    async getProducts() {
      const url = `${this.authURL}/api/${this.path}/admin/products`;

      try {
        const res = await axios.get(url);
        // console.log(res);
        this.products = res.data.products;
      } catch (err) {
        console.log(err);
      }
    },
    putProduct(item) {
      this.tempProduct = item;
    },
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
});

app.mount("#app");
