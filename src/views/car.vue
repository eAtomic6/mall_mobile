<template>
  <div class="container">
    <div class="title">
      <span>购物车({{list.length}})</span>
      <span class="opera" v-if="!showDel" @click="showDel=!showDel">管理</span>
      <span class="opera" v-if="showDel" @click="showDel=!showDel">完成</span>
    </div>
    <ul class="car-box" v-if="list.length>0">
      <li v-for="(item,index) in list" :key="item.time">
        <van-row>
          <van-col span="3">
            <van-checkbox v-model="item.bool" @click="singleCheck"></van-checkbox>
          </van-col>
          <van-col span="7">
            <img :src="item.image">
          </van-col>
          <van-col span="13" offset="1">
            <p class="name">{{item.name}}</p>
            <div class="price-num-box">
              <span>¥{{item.price}}</span>
              <van-stepper v-model="item.num" @plus="changeFn(index,'plus')" @minus="changeFn(index)" />
            </div>
          </van-col>
        </van-row>
      </li>
    </ul>
    <div v-else class="no-data">
      <img :src="getImgUrl('timg.jpg')" alt="">
      <p>购物车空空如也，去添加商品到购物车把！</p>
    </div>
    <div class="car-footer">
      <van-checkbox v-model="allFlag" @click="allCheck">全选</van-checkbox>
      <div class="del" v-if="showDel" @click="deleteFn">删除</div>
      <div>合计：<span class="total">¥{{totalPrice}}</span></div>
      <van-button round>结算</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'car',
  data() {
    return {
      list: [],
      showDel: false,
      allFlag: false,
      totalPrice: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList() {
      let arr = JSON.parse(localStorage.getItem('carList'))
      arr.map(item => {
        item.bool = false
      })
      this.list = [...arr]
    },
    getImgUrl:function(url){
      return require('@/assets/'+url);
    },
    singleCheck() {
      this.totalPrice = 0
      let arr = this.list.filter(item => item.bool)
      this.allFlag = arr.length === this.list.length
      arr.forEach(item => {
        this.totalPrice += (item.num * item.price)
      })
    },
    allCheck() {
      if(this.allFlag) {
        this.totalPrice = 0
        this.list.forEach(item => {
          item.bool = true
          this.totalPrice += (item.num * item.price)
        })
      }else{
        this.list.forEach(item => item.bool = false)
        this.totalPrice = 0
      }
    },
    changeFn(e,type='init') {
      if(type==='init') {
        --this.list[e].num
      }else{
        ++this.list[e].num
      }
      localStorage.setItem('carList',JSON.stringify(this.list))
      this.singleCheck()
    },
    deleteFn() {
      let arr = this.list.filter(item => item.bool)
      if(!arr.length){
        this.$toast('您还没有选择宝贝哦')
      }else{
        this.list = this.list.filter(item => !item.bool)
        this.totalPrice = 0
        localStorage.setItem('carList',JSON.stringify(this.list))
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/common.less";

.container {
  background: @bg-grey;
  padding: 0 10px;
  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    span.opera {
      position: absolute;
      right: 15px;
    }
  }
  .car-box {
    font-size: @font-14;
    margin-bottom: 30px;
    li {
      margin-bottom: 10px;
      background: @text-white;
      padding: 10px;
      border-radius: 10px;
      position: relative;
      .van-col:first-of-type {
        position: relative;
      }
      img {
        width: 100%;
      }
      p.name {
        display: -webkit-box;
        -webkit-line-clamp:2;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
      }
      .price-num-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        span {
          color: @bg-ff7904;
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
      width: 50%;
    }
  }
  .car-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background: @text-white;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    span.total {
      color: @text-orange;
    }
    button {
      width: 100px;
      background: @bg-red;
      color: @text-white;
    }
  }
}
</style>