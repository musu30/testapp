<template >
  <section style="padding: 0px">
    <div v-if="loading" class="loading">Loading&#8230;</div>

    <div class="fixed_header">
      <div class="row">
        <div class="col-lg-12">
          <div style="float: left">
            <label
              ><i class="fa fa-arrow-left" style="padding-left: 4px"></i>
              {{ resturentName }}</label
            >
          </div>
          <div style="float: right">
            <a href="#" id="cart" v-on:click="viewCart()"
              ><i class="fa fa-shopping-cart"></i> My Orders
              <span class="badge">{{ count }}</span></a
            >
          </div>
        </div>
      </div>
      <div>
        <div
          v-if="cartViewFlag"
          class="container stack-top"
          style="position: absolute"
        >
          <div
            class="shopping-cart"
            style="float: right; background: black; color: white"
          >
            <div class="shopping-cart-header">
              <i class="fa fa-shopping-cart cart-icon"></i
              ><span class="badge"
                ><b>{{ count }}</b></span
              >
              <div class="shopping-cart-total">
                <span class="lighter-text-white"><b>Total:</b></span>
                <span class="main-color-text-white"
                  ><b>{{ total }}</b></span
                >
              </div>
            </div>

            <ul
              v-for="data in cartedList"
              v-bind:key="data.dish.dish_id"
              class="shopping-cart-items"
            >
              <li class="clearfix">
                <img
                  :src="data.dish.dish_image"
                  alt="item1"
                  style="height: 30px; width: 30px !important"
                />
                <span class="item-name">{{ data.dish.dish_name }}</span>
                <span class="item-price"
                  >( {{ calcuateIndividual(data) }}
                  {{ data.dish.dish_currency }})
                </span>
                <span class="item-quantity badge"
                  ><b>{{ data.qty }}</b></span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="scroll"
      style="
        overflow-x: hiddden;
        overflow: scroll;
        background: white;
        font-color: black;
        padding: 4px;
      "
    >
      <div v-if="menuList.length > 0">
        <a
          v-for="(data, index) in menuList"
          :key="data.menu_category_id"
          v-on:click="(activeIndex = index), viewDidhesList(data)"
          :class="{
            activeData: index === activeIndex,
          }"
          style="padding: 5px"
        >
          {{ data.menu_category }}</a
        >
      </div>
    </div>

    <div class="row">
      <div
        class="col-lg-3-md-4-sm-5-xs-6"
        v-for="data in dishesList"
        v-bind:key="data.dish_id"
      >
        <div class="content" style="width: 400px">
          <div class="row">
            <div class="col" style="max-width: 300px">
              <div class="row" style="max-width: 200px">
                <div class="rectangles">
                  <div class="rectangle">
                    <div
                      class="circle"
                      :class="{
                        green_1: data.dish_Availability,
                        red_1: !data.dish_Availability,
                      }"
                    ></div>
                  </div>
                </div>

                <label style="margin-left: 5px">
                  <b>{{ data.dish_name }}</b></label
                >
              </div>

              <div class="row">
                <div class="">
                  <div style="float: left">
                    <label>
                      <b
                        >{{ data.dish_currency }} {{ data.dish_price }}</b
                      ></label
                    >
                  </div>

                  <div style="float: right !important; margin-left: 70px">
                    <label>
                      <b>{{ data.dish_calories }} Calories</b></label
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <p>{{ data.dish_description }}</p>
              </div>
            </div>
            <div style="min-width: 120px; max-width: 120px">
              <img
                :src="data.dish_image"
                alt="image"
                style="width: 100%; height: 150px"
              />
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div style="float-left">
                <div class="rcorners1 col">
                  <input
                    class="btn"
                    type="button"
                    name
                    value="-"
                    v-on:click="decrementQty(data)"
                  />
                  {{ displayCartedQty(data) }}
                  <input
                    class="btn"
                    type="button"
                    name
                    value="+"
                    v-on:click="incrementQty(data)"
                  />
                </div>
              </div>
            </div>
            <div class="row" style="color: red">
              <p>{{ checkContent(data.addonCat) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "../assets/menuList/menuList.css";
import "../assets/menuList/header.css";
export default {
  name: "menulist",
  data() {
    return {
      addOnCatogarylist: [],
      publicUrl: "https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099",
      dataList: [],
      menuList: [],
      dishesList: [],
      selectedMenuId: "",
      cartedList: [],
      count: 0,
      cartViewFlag: false,
      total: 0,
      resturentName: "",
      loading: false,
      activeIndex: 0,
    };
  },
  methods: {
    getDataList() {
      this.loading = true;
      console.log(this.activeIndex + "");
      this.axios
        .get(this.publicUrl, {})
        .then((response) => {
          if (response.data) {
            this.dataList = response.data;
            this.resturentName = this.dataList[0].restaurant_name;
            this.menuList = this.dataList[0].table_menu_list;
            this.dishesList = this.dataList[0].table_menu_list;
            this.viewDidhesList(this.dataList[0].table_menu_list[0]);
            this.activeIndex = -1;
            console.log(this.activeIndex + "");
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    calcuateIndividual(data) {
      return data.dish.dish_price * data.qty;
    },
    viewCart() {
      this.cartViewFlag = !this.cartViewFlag;
      this.cartCheck();
    },
    viewDidhesList(data) {
      if (data) {
        this.dishesList = data.category_dishes;
        this.selectedMenuId = data.menu_category_id;
      } else {
        this.dishesList = [];
      }
    },
    incrementQty(data) {
      this.cartCheck();
      var cartList = this.menuList;
      var index = cartList.findIndex(
        (item) => item.menu_category_id == this.selectedMenuId
      );
      var cartMenuInfo = cartList[index];
      data.addonCat = "";
      var new_cartInfo = {
        qty: 1,
        menu_category: cartMenuInfo.menu_category,
        menu_id: cartMenuInfo.menu_category_id,
        dish: data,
      };
      if (this.cartedList.length > 0) {
        var index2 = this.cartedList.findIndex(
          (item) => item.dish.dish_id == data.dish_id
        );
        index2 != -1 && this.cartedList[index2].dish.dish_id == data.dish_id
          ? this.cartedList[index2].qty++
          : this.cartedList.push(new_cartInfo);
      } else {
        this.cartedList.push(new_cartInfo);
      }
      if (window.localStorage) {
        window.localStorage.setItem(
          "cart_items",
          JSON.stringify(this.cartedList)
        );
      }
    },
    decrementQty(data) {
      this.cartCheck();
      if (this.cartedList.length > 0) {
        var index2 = this.cartedList.findIndex(
          (item) => item.dish.dish_id == data.dish_id
        );
        if (
          index2 != -1 &&
          this.cartedList[index2].dish.dish_id == data.dish_id
        ) {
          this.cartedList[index2].qty > 2
            ? this.cartedList[index2].qty--
            : this.cartedList.splice(index2, 1);
        }
      }
      if (window.localStorage) {
        window.localStorage.setItem(
          "cart_items",
          JSON.stringify(this.cartedList)
        );
      }
    },
    displayCartedQty(data) {
      this.cartCheck();
      if (this.cartedList.length > 0) {
        var index2 = this.cartedList.findIndex(
          (item) => item.dish.dish_id == data.dish_id
        );
        if (
          index2 != -1 &&
          this.cartedList[index2].dish.dish_id == data.dish_id
        ) {
          return this.cartedList[index2].qty;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    cartCheck() {
      if (window.localStorage) {
        var localCartString =
          window.localStorage.getItem("cart_items") || "null";
        if (localCartString != "null") {
          this.cartedList = JSON.parse(localStorage.getItem("cart_items"));
          // console.log("cartedList---------" + JSON.stringify(this.cartedList));
        }
        this.calculateData();
      }
    },
    calculateData() {
      this.total = 0;
      var totalCount = 0;
      this.cartedList.forEach((item) => {
        this.total += Number(item.qty) * Number(item.dish.dish_price);
        totalCount += Number(item.qty);
      });
      this.count = totalCount;
    },
    checkContent(data) {
      if (data) {
        this.addOnCatogarylist = data;
        if (this.addOnCatogarylist.length > 0) {
          return "Customizations available";
        }
      } else {
        return "";
      }
    },
  },
  mounted() {
    this.cartCheck();
    this.getDataList();
  },
};
</script>

<style>
.scroll {
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.example-two-header {
  .logo {
    width: 25%;
  }
  nav {
    width: 75%;
  }
}

.example-three {
  .logo,
  nav {
    width: 100%;
  }

  .nav-item {
    color: #f6f7ee;
  }
}

header {
  background: #152637;
}

.example-one-header,
.example-two-header {
  border-radius: 3px;
}

.example-three-header {
  border-radius: 3px 3px 0 0;
}

.example-three nav {
  background: #727c87;
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  border-radius: 0 0 3px 3px;
}

.nav-item {
  padding: 12px 16px 13px;

  &:not(:last-child) {
    border-right: 1px solid rgba(#727c87, 0.2);
  }
}

* {
  box-sizing: border-box;
}

header,
nav {
  font-size: 0;
}

.logo,
.nav-item {
  font-size: 14px;
}

.logo,
.nav-item,
.vertical-align-middle {
  display: inline-block;
  vertical-align: middle;
}

.title {
  margin: 24px 0 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #999;
}

.scroll::-webkit-scrollbar {
  display: none;
}
</style>
