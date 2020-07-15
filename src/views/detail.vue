<template>
  <div class="container">
    <div class="content-box">
      <van-swipe :autoplay="3000" indicator-color @change="onChange">
        <van-swipe-item v-for="(image, index) in detailInfo.images" :key="index">
          <img :src="image" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{detailInfo.images.length}}
          </div>
        </template>
      </van-swipe>
      <div class="price-time-box content">
        <p class="price"><span>¥{{detailInfo.price}}</span></p>
        <p class="time">
          <span>距秒杀结束还剩</span>
          <van-count-down :time="time">
            <template v-slot="timeData">
              <span class="block">{{ timeFilter(timeData.hours) }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeFilter(timeData.minutes) }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeFilter(timeData.seconds) }}</span>
            </template>
          </van-count-down>
        </p>
      </div>
      <div class="detail-box content">
        <p class="name"><span>{{detailInfo.name}}</span></p>
        <p class="like">
          <van-icon name="like-o" size="20" />
          <span>收藏</span>
        </p>
      </div>
    </div>
    <div class="detail-footer content">
      <p class="car" @click="toCar">
        <van-icon name="shopping-cart-o" size="20" />
        <span>购物车</span>
      </p>
      <p class="btn">
        <van-button round @click="addCarFn()">加入购物车</van-button>
        <van-button round @click="show=true">立即购买</van-button>
      </p>
    </div>
    <van-popup v-model="show" round position="bottom" :style="{ height: '60%' }" closeable close-icon="close" @click-overlay="closeFn" @close="closeFn">
      <div class="pop-content">
        <div class="title flex">
          <img :src="detailInfo.image" alt="">
          <p>
            <span>¥{{detailInfo.price}}</span>
            <span class="text">库存100件</span>
            <span class="text">生产日期：{{detailInfo.date}}</span>
          </p>
        </div>
        <div class="step van-hairline--top flex">
          <span>购买数量</span>
          <van-stepper v-model="numBuy" />
        </div>
        <div class="btn">
          <van-button round @click="sureFn">确认</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import {MIXIN} from "@/assets/js/mixin";

export default {
  name: 'detail',
  mixins: [MIXIN],
  data() {
    return {
      images: [],
      detailInfo: {},
      current: 0,
      time: new Date('2020-07-15').getTime(),
      show: false,
      numBuy: 1
    }
  },
  created () {
    let obj = JSON.parse(localStorage.getItem('detail'))
    obj.images = [obj.image,obj.image]
    this.detailInfo = {...obj}
  },
  methods: {
    /**
      * @desc - 轮播图页码  
    */
    onChange(index) {
      this.current = index;
    },
    /**
      * @desc - 路由跳转至购物车  
    */
    toCar() {
      this.$router.push({
        path: '/Car'
      })
    },
    /**
      * @desc - 时分秒小于10补0  
    */
    timeFilter(val) {
      return val>9 ? val : '0'+val
    },
    /**
      * @desc - popup弹出层关闭  
    */
    closeFn() {
      this.numBuy = 1
    },
    /**
      * @desc - 点击确认按钮触发  
    */
    sureFn() {
      let obj = {...this.detailInfo}
      obj.num = this.numBuy
      let _arr = []
      if(localStorage.getItem('orderList')) {
        let arr = JSON.parse(localStorage.getItem('orderList'))
        arr.push(obj)
        _arr = [...arr]
      }else{
        _arr = [obj]
      }
      localStorage.setItem('orderList',JSON.stringify(_arr))
      this.$toast('下单成功,会安排尽快发货')
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/common.less";

.container {
  .content-box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 50px;
    background: @bg-grey;
    padding: 5px;
  }
  .van-swipe {
    position: relative;
    img {
      width: 100%;
      display: block;
    }
    .custom-indicator {
      position: absolute;
      right: 10px;
      bottom: 10px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .content {
    display: flex;
  }
  .price-time-box {
    margin-bottom: 10px;
    p {
      height: 40px;
    }
    .price {
      width: 60%;
      background-image: linear-gradient(to bottom left, #EC2F89, #DE3066);
      color: @text-white;
      line-height: 40px;
      padding: 0 10px;
    }
    .time {
      width: 40%;
      background: @bg-grey;
      font-size: @font-12;
      text-align: center;
      .colon {
        display: inline-block;
        margin: 0 4px;
        color: #ee0a24;
      }
      .block {
        display: inline-block;
        width: 22px;
        color: @text-red;
        font-size: 12px;
        text-align: center;
        border: 1px solid #eee;
      }
    }
  }
  .detail-box {
    font-size: @font-14;
    background: @text-white;
    border-radius: 5px;
    p {
      padding: 8px;
    }
    .name {
      width: 80%;
      font-weight: bold;
    }
    .like {
      width: 20%;
      text-align: center;
      span {
        display: block;
      }
    }
  }
  .detail-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: @font-14;
    padding-right: 10px;
    .car {
      width: 20%;
      text-align: center;
      span {
        display: block;
      }
      i {
        color: @text-orange;
      }
    }
    .btn {
      width: 80%;
      display: flex;
      justify-content: space-between;
      button {
        width: 48%;
        color: @text-white;
        &:first-of-type {
          background: @bg-red;
        }
        &:last-of-type {
          background: @bg-ffbdod;
        }
      }
    }
  }
  .pop-content {
    position: relative;
    padding: 40px 10px 10px 10px;
    height: 100%;
    box-sizing: border-box;
    .flex {
      display: flex;
    }
    .title {
      img {
        width: 40%;
        height: 80%;
      }
      span {
        display: block;
        text-align: left;
        padding-left: 20px;
        &:first-of-type {
          color: @text-orange;
          font-size: @font-18;
        }
        &.text {
          color: @bg-666;
          font-size: @font-14;
        }
      }
    }
    .step {
      margin-top: 10px;
      padding: 10px 0;
      justify-content: space-between;
    }
    .btn {
      position: absolute;
      left: 0;
      bottom: 5px;
      text-align: center;
      width: 100%;
      button {
        width: 95%;
        background: @text-orange;
        color: @text-white;
      }
    }
  }
}
</style>