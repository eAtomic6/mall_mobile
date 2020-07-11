<template>
  <div class="main">
      <template v-if="$route.path!=='/Home'">
        <div class="top-bar" @click="goBack">
          <van-icon name="arrow-left" size="20" />
        </div>
      </template>
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/common.less";

.main {
  .top-bar {
    position: absolute;
    left: 15px;
    top: 8px;
    z-index: 999;
    background: lightgrey;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>