<template>
  <div>
    <mt-swipe :auto="4000">

      <mt-swipe-item
        v-for="item in lunbotuList"
        :key="item.img"
      >
        <img
          :src="item.img"
          alt=""
        >
      </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
          <img src="../../images/menu1.png">
          <div class="mui-media-body">新联资讯</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
          <img src="../../images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
          <img src="../../images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
          <img src="../../images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
          <img src="../../images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
          <img src="../../images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>
  </div>
</template>


<script>

import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      lunbotuList: []
    }
  },
  created () {
    this.getLunbotu()
  },
  methods: {
    getLunbotu () {
      this.$http.get('http://localhost:3000/api/getLunbo').then(result => {
        console.log(result.body)
        if (result.body.status === 0) {
          this.lunbotuList = result.body.message
        } else {
          Toast('加载轮插图失败.')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }

    &:nth-child(2) {
      background-color: blue;
    }

    &:nth-child(3) {
      background-color: green;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: white;
  border: none;
  
  img {
    width: 60px;
    height: 60px;
  }

}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;

  .mui-media-body {
    font-size: 13px;
  }
}
</style>