<template>
  <div class="order">
      <div class="title">我的订单</div>
      <ul class="order-content" v-if="order.length>0">
          <li v-for="(item,index) in order" :key="item.id+index">
              <div class="shop">
                  <img :src="getImgUrl('INS.png')" alt="">
                  <span class="name">英思官方旗舰店<van-icon name="arrow" /></span>
                  <span class="success">交易成功</span>
              </div>
              <van-row class="row" @click.stop="toOrderDetail(item)">
                  <van-col span="6">
                    <img :src="item.image">
                  </van-col>
                  <van-col span="12" offset="1">
                    <p class="name">{{item.name}}</p>
                  </van-col>
                  <van-col span="4" class="pd-10"><span>¥{{item.price}}</span><span>× {{item.num}}</span></van-col>
              </van-row>
              <div class="btn">
                  <van-button round>删除订单</van-button>
                  <van-button round>评价</van-button>
              </div>
          </li>
      </ul>
      <div v-else class="no-data">
          <img :src="getImgUrl('no-order.jpg')" alt="">
          <p>暂无订单记录！</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'order',
  data() {
      return {
          order: []
      }
  },
  created() {
      let arr = JSON.parse(localStorage.getItem('orderList'))
      if(arr) {
          this.order = arr
      }
  },
  methods: {
      toOrderDetail(item) {
          this.$router.push({
              path: '/orderDetail'
          })
          localStorage.setItem('orderDetail',JSON.stringify(item))
      },
      getImgUrl:function(url){
          return require('@/assets/'+url);
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
.order-content {
    font-size: @font-14;
    position: absolute;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: @bg-grey;
    padding: 10px;
    li {
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        background: @text-white;
        .shop {
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
                width: 20px;
            }
            .name {
                font-size: @font-18;
                color: #383838;
                display: flex;
                align-items: center;
                margin-left: -60px;
            }
            .success {
                color: @bg-ff7904;
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
}
.no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    img {
        width: 100%;
    }
    p {
      font-size: @font-14;
    }
}
</style>