<template>
  <div class="container">
    <div class="title">
      <span>购物车({{list.length}})</span>
      <span class="opera" v-if="!showDel" @click="showDel=!showDel">管理</span>
      <span class="opera" v-else @click="showDel=!showDel">完成</span>
    </div>
    <ul class="car-box" v-if="list.length>0">
      <li v-for="(item,index) in list" :key="item.time+index">
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
      <img :src="getImgUrl('no-data.jpg')" alt="">
      <p>购物车空空如也，去添加商品到购物车把！</p>
    </div>
    <div class="car-footer">
      <div>
        <van-checkbox v-model="allFlag" @click="allCheck">全选</van-checkbox>
        <!-- <div class="del" v-if="showDel" @click="deleteFn">删除</div> -->
      </div>
      <div>
        <div>合计：<span class="total">¥{{totalPrice}}</span></div>
        <van-button round @click="saveFn" v-if="!showDel">结算</van-button>
        <van-button round v-else @click="deleteFn">删除</van-button>
      </div>
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
      if(arr){
       arr.map(item => {
        item.bool = false
      })
      this.list = [...arr] 
      }
    },
    getImgUrl:function(url){
      return require('@/assets/img/'+url);
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
      this.totalPrice = 0
      if(this.allFlag) {
        this.list.forEach(item => {
          item.bool = true
          this.totalPrice += (item.num * item.price)
        })
      }else{
        this.list.forEach(item => item.bool = false)
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
    deleteFn(type='init') {
      let arr = this.list.filter(item => item.bool)
      if(!arr.length){
        this.$toast('您还没有选择宝贝哦')
      }else{
        this.list = this.list.filter(item => !item.bool)
        this.totalPrice = 0
        localStorage.setItem('carList',JSON.stringify(this.list))
        if(type === 'save') {
          let _arr = []
          if(localStorage.getItem('orderList')) {
            _arr = arr.concat(JSON.parse(localStorage.getItem('orderList')))
          }else{
            _arr = arr
          }
          localStorage.setItem('orderList',JSON.stringify(_arr))
          this.$toast('结算成功')
        }else{
          this.$toast(`已从购物车删除${arr.length}个商品`)
        }
      }
    },
    saveFn() {
      this.deleteFn('save')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/common.less";

.container {
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
    position: absolute;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 50px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: @bg-grey;
    padding: 10px;
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
        border-radius: 5px;
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
      width: 100%;
    }
    p {
      font-size: @font-14;
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
    padding: 5px 10px;
    >div {
      display: flex;
      align-items: center;
    }
    span.total {
      color: @text-orange;
      margin-right: 5px;
    }
    button {
      width: 100px;
      background: @bg-red;
      color: @text-white;
    }
  }
}
</style>