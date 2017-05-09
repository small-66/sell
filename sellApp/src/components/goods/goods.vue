<template>
  <div class="foods">
    <div class="menu-wrap" ref="menuWrapper">
      <ul>
        <li v-for="(item ,index) in goods" class="menu-item"
            :class="{'current':currentIndex=== index}"
            @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0"
                  class="icon"
                  :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list" ref="foodsListHook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}</span><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span><span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrap">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice" ></shopcart>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  const ERR_OK = 0
  export default {
    components: {
      shopcart,
      cartcontrol
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height && this.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsListHook
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodsList = this.$refs.foodsListHook
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodsList.length; i++) {
          let item = foodsList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/styuls/mixin"
  .foods
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    display: flex
    overflow: hidden
    .menu-wrap
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        width: 56px
        height: 54px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-repeat: no-repeat
          background-size: 12px 12px
          &.decrease
            bg-image("decrease_3")
          &.discount
            bg-image("discount_3")
          &.guarantee
            bg-image("guarantee_3")
          &.invoice
            bg-image("invoice_3")
          &.special
            bg-image("special_3")


        .text
          display table-cell
          width: 56px
          vertical-align: middle
          font-size:12px
          border-1px(rgba(7,17,27,0.1))
    .foods-wrap
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .desc, .extra
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            line-height: 10px
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 18px
              font-size: 14px
              color: rgb(240,20,20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147,153,159)
          .cartcontrol-wrap
            position: absolute
            right: 0
            bottom: 0
</style>

