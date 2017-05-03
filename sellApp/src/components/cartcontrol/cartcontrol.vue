<template>
  <div class="cartcontrol">
    <transition name="move">
    <div class="cart-decrease icon-remove_circle_outline"
         v-show="food.count>0"
         @click="decreaseCart"></div>
    </transition>
    <div class="cart-count"  v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle"
         @click="addCart"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      console.log(this.food)
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .move-enter-active
      transition: all .4s linear
      transform: translate3D(0,0,0) rotate(0)
    .move-leave-active
      transition: all .4s linear
      transform: translate3D(0,0,0) rotate(0)
    .move-enter
      opacity 0
      transform: translate3D(24px,0,0) rotate(180deg)
    .move-leave-active
      opacity 0
      transform: translate3D(24px,0,0) rotate(180deg)
    .cart-decrease,.cart-add
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)
    .cart-decrease
      display: inline-block
    .cart-count
      display: inline-block
      width: 12px
      padding-top: 6px
      font-size: 10px
      line-height: 24px
      vertical-align: top
      text-align: center
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
</style>
