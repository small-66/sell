<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrap">
          <div class="logo"
               :class="{'highlight': totalCount>0}">
            <span class="icon-shopping_cart"
                  :class="{'highlight': totalCount>0}"></span>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price"  :class="{'highlight': totalPrice>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'enough': totalPrice>= minPrice}">
          {{ payDesc }}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls" :key="ball" v-show="ball.show" class="ball"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ]
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrap
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0,160,220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
            font-size: 9px
            font-weight: 700
            background: rgb(240,20,20)
            color: #fff
        .price
          display: inline-block
          vertical-align: top
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid rgba(255,255,255,0.1)
          box-sizing: border-box
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height 24px
          font-size: 10px
          color: rgba(255,255,255,0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          line-height: 48px
          height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          color: rgba(255,255,255,0.4)
          background: #2b333b
          &.enough
            background: #00b43c
            color: #fff

    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0,160,220)
        z-index: 200
      /*.drop-enter-active
        transition: all .4s linear
      .drop-leave-active
        transition: all .4s linear
      .drop-enter
        transform: translateY(30px);
      .drop-leave-active
        transform: translateY(30px);*/
</style>
