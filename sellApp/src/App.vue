<template>
  <div id="app">
    <m-header></m-header>
    <div class="tab">
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

<script>
import mHeader from './components/header/header'
export default {
  data () {
    return {
      seller: {}
    }
  },
  components: {
    mHeader
  }
}
</script>

<style>
  #app .tab {
    display: flex;
    width: 100%;
    line-height: 40px;
    height: 40px;
    position: relative;
  }
  #app .tab:after{
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .tab-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: rgb(77,85,93);
  }
  .tab-item.active{
    color: rgb(240,20,20);
  }
</style>
