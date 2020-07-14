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
                <van-icon name="cart-circle-o" size="20" class="to-car" @click.stop="toCar" />
                <van-icon name="user-circle-o" size="20" @click.stop="toOrder" />
              </span>
            </p>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
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
    getTab() {
      this.$axios.get('/api/tab').then(res => {
        this.tabs = res.data
      })
    },
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
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    toDetail(item) {
      localStorage.setItem('detail',JSON.stringify(item))
      this.$router.push({
        path: '/Detail'
      })
    },
    toCar() {
      this.$router.push({
        path: '/Car'
      })
    },
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
    bottom: 0;
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
          .to-car {
            margin-right: 10px;
          }
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
}
</style>
