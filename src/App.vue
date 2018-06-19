<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#000"
      text-color="#9B9B9B"
      active-text-color="#fff">
      <h1 class="logo">Shoptime</h1>
      <el-menu-item index="1">HOME</el-menu-item>
      <el-menu-item index="2">ORDERS</el-menu-item>
      <el-menu-item index="3">PRODUCT</el-menu-item>
    </el-menu>
    <div class="container"><router-view/></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
#app {

}
.container{
  padding: 20px 30px;
}
.logo{
  float: left;
  color: #fff;
  height: 60px;
  padding: 0 80px 0 40px;
  line-height: 60px;
}
</style>
