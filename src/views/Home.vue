<template>
  <div class="home">
    <ul class="home-tab">
      <li v-for="item in tabs" :key="item.id" :class="[activeItem===item.id?'active':'']" @click="changeTab(item)">{{item.name}}</li>
    </ul>
    <div class="home-content">
      <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <van-cell v-for="item in list" :key="item.id" @click="toDetail(item)">
            <img :src="item.image">
            <p class="name">{{item.name}}</p>
            <p class="price">
              <span>¥{{item.price}}</span>
              <span>
                <van-icon name="cart-circle-o" size="20" @click.stop="addCarFn('home',item)" />
              </span>
            </p>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="home-footer-tab">
      <p @click.stop="toCar">
        <van-icon name="shopping-cart-o" size="20" />
        <span>购物车</span>
      </p>
      <p @click.stop="toOrder">
        <van-icon name="user-circle-o" size="20" />
        <span>我的订单</span>
      </p>
    </div>
  </div>
</template>

<script>
import {MIXIN} from "@/assets/js/mixin";

export default {
  name: 'home',
  mixins: [MIXIN],
  data() {
    return {
      tabs: [],
      list: [],
      activeItem: 1,
      loading: false,
      finished: false,
      refreshing: false,
      dataList: []
    }
  },
  mounted () {
    this.getTab()
  },
  methods: {
    /**
      * @desc - 请求顶部tab栏数据  
    */
    getTab() {
      this.$axios.get('/api/tab').then(res => {
        this.tabs = res.data
      })
    },
    /**
      * @desc - 请求商品列表数据  
    */
    getList() {
      this.$axios.get('/api/list').then(res => {
        let arr = [...res.data]
        this.dataList = [...res.data]
        if(this.activeItem === 1) {
          this.list = arr
        }else{
          this.list = arr.filter(item => this.activeItem === item.id)
          this.finished = true
        }
      })
    },
    /**
      * @desc - tab栏切换
      * @param {object} item - 当前选中项  
    */
    changeTab(item) {
      this.activeItem = item.id
      this.loading = true
      if(this.activeItem === 1) {
        this.list = []
        this.loading = false
        if(this.list.length < 20) {
          this.finished = false
        }
      }else{
        this.list = this.dataList.filter(item => this.activeItem === item.id)
        this.loading = false
        this.finished = true
      }
    },
    /**
      * @desc - 执行列表请求  
    */
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      if(!this.list.length) {
        this.getList()
        this.loading = false
      }else{
        for(var i = 0; i < 10; i++) {
          this.list.push(this.list[i])
        }
        this.dataList = [...this.list]
        this.loading = false
        if(this.list.length >= 20) {
          this.finished = true
        }
      }
    },
    /**
      * @desc - 下拉刷新  
    */
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    /**
      * @desc - 路由跳转至商品详情  
    */
    toDetail(item) {
      localStorage.setItem('detail',JSON.stringify(item))
      this.$router.push({
        path: '/Detail'
      })
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
      * @desc - 路由跳转至我的订单  
    */
    toOrder() {
      this.$router.push({
        path: '/Order'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/common.less";

.home {
  &-tab {
    height: 50px;
    line-height: 50px;
    display: flex;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    background: @text-white;
    width: 100%;
    li {
      min-width: 25%;
      text-align: center;
      &.active {
        border-bottom: 3px solid @text-red;
      }
    }
  }
  &-content {
    padding: 10px;
    background: @bg-grey;
    position: absolute;
    left: 0;
    top: 50px;
    right: 0;
    bottom: 50px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .van-list {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 30px;
      /deep/ .van-cell {
        width: 49%;
        padding: 0;
        margin-bottom: 10px;
        border: none;
        border-radius: 5px;
        &:nth-child(odd) {
          margin-right: 6px;
        }
        &::after {
          border: none;
        }
        img {
          width: 100%;
        }
        p.name {
          min-height: 40px;
          display: -webkit-box;
          -webkit-line-clamp:2;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          padding: 0 10px;
        }
        p.price {
          color: @text-orange;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding: 0 10px;
        }
      }
      /deep/ .van-list__finished-text {
        position: absolute;
        left: 50%;
        bottom: -10px;
        transform: translateX(-50%);
      }
    }
  }
  &-footer-tab {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    height: 50px;
    font-size: @font-14;
    p {
      text-align: center;
      span {
        display: block;
      }
    }
  }
}
</style>
