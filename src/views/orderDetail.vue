<template>
  <div class="container">
      <div class="title">订单详情</div>
      <div class="content">
          <div class="shop">
            <img :src="getImgUrl('INS.png')" alt="">
            <span class="name">英思官方旗舰店<van-icon name="arrow" /></span>
        </div>
        <van-row class="row">
            <van-col span="6">
            <img :src="detailObj.image">
            </van-col>
            <van-col span="12" offset="1">
            <p class="name">{{detailObj.name}}</p>
            </van-col>
            <van-col span="4" class="pd-10"><span>¥{{detailObj.price}}</span><span>× {{detailObj.num}}</span></van-col>
        </van-row>
        <div class="after"><van-button round @click="callFn">申请售后</van-button></div>
        <div class="pay">
            <span>实付款</span>
            <span>¥{{detailObj.price*detailObj.num}}</span>
        </div>
        <div class="code"><span>订单编号:</span><span>{{new Date(detailObj.date).getTime()}}</span></div>
        <div class="btn">
            <van-button round>删除订单</van-button>
            <van-button round>评价</van-button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'order-detail',
  data() {
      return {
          detailObj: {}
      }
  },
  created() {
      let obj = JSON.parse(localStorage.getItem('orderDetail'))
      if(obj){
          this.detailObj = obj
      }
  },
  methods: {
      getImgUrl:function(url){
          return require('@/assets/'+url);
      },
      callFn() {
          window.location.href = 'tel:027-87320576'
      }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/common.less";

.title {
    text-align: center;
    height: 40px;
    line-height: 40px;
}
.content {
    font-size: @font-14;
    position: absolute;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 0;
    padding: 10px;
    background: @bg-grey;
    .shop {
        font-weight: bold;
        display: flex;
        align-items: center;
        img {
            width: 20px;
        }
        .name {
            font-size: @font-18;
            color: #383838;
            display: flex;
            align-items: center;
            margin-left: 10px;
        }
        .success {
            color: @text-orange;
        }
    }
    .row {
        margin: 20px 0;
        img {
            width: 100%;
            display: block;
            border-radius: 5px;
        }
    }
    p.name {
        display: -webkit-box;
        -webkit-line-clamp:3;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
    }
    .after {
        text-align: right;
        margin: 20px 0;
        button {
            width: 100px;
        }
    }
    .code {
        span:first-of-type {
            margin-right: 20px;
        }
    }
    .pay {
        display: flex;
        justify-content: space-between;
        padding-right: 10px;
        margin: 10px 0;
        span:last-of-type {
            color: @text-orange;
            font-size: 18px;
        }
    }
    .pd-10 {
        padding: 10px 0;
        margin-left: 5px;
        text-align: right;
        span {
            display: block;
        }
        span:first-of-type {
            font-size: 16px;
        }
        span:last-of-type {
            color: grey;
        }
    }
    .btn {
        text-align: right;
        position: absolute;
        bottom: 10px;
        right: 10px;
        button {
            width: 100px;
            margin-left: 10px;
        }
        button:last-of-type {
            color: @text-orange;
            border-color: @text-orange;
        }
    }
}
</style>