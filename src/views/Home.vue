<template>
  <div class="home">
    <ul class="home-tab">
      <li v-for="item in tabs" :key="item.id" :class="[activeItem===item.id?'active':'']" @click="changeTab(item)">{{item.name}}</li>
    </ul>
    <div class="home-content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad()">
        <van-cell v-for="item in list" :key="item.id" @click="toDetail(item)">
          <img :src="item.image">
          <p class="name">{{item.name}}</p>
          <p class="price">
            <span>¥{{item.price}}</span>
            <van-icon name="shopping-cart-o" size="20" @click.stop="toCar" />
          </p>
        </van-cell>
      </van-list>
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
      finished: false
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
        this.list = []
        let arr = [...res.data]
        if(this.activeItem === 1) {
          this.list = arr
        }else{
          this.list = arr.filter(item => this.activeItem === item.product_type)
        }
        this.loading = false
        this.finished = true
      })
    },
    changeTab(item) {
      this.activeItem = item.id
      this.loading = false
      this.finished = false
      this.getList()
    },
    onLoad() {
      this.getList()
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
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/common.less";

.home {
  position: relative;
  &-tab {
    height: 50px;
    line-height: 50px;
    display: flex;
    overflow-x: scroll;
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
    .van-list {
      display: flex;
      flex-wrap: wrap;
      /deep/ .van-cell {
        width: 49%;
        padding: 0;
        margin-bottom: 10px;
        border: none;
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
          display: -webkit-box;
          -webkit-line-clamp:2;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        p.price {
          color: @text-orange;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
