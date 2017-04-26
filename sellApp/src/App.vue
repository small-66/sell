<template>
  <div id="app">
    <m-header :seller="seller"></m-header>
    <div class="tab border-1px">
      <router-link to="goods" tag="a" class="tab-item">
        商品
      </router-link>
      <router-link to="ratings" tag="a" class="tab-item">
        评论
      </router-link>
      <router-link to="seller" tag="a" class="tab-item">
        商家
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import mHeader from './components/header/header'
const ERR_OK = 0
export default {
  components: {
    mHeader
  },
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = response.data
        console.log(this.seller)
      }
    })
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/styuls/mixin.styl"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      //border-bottom: 1px solid rgba(7,17,27,0.1)
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77,85,93)
        &.active
          color: rgb(240,20,20)
</style>
