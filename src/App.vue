<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      background-color="#000"
      text-color="#9B9B9B"
      active-text-color="#fff">
      <h1 class="logo">Shoptime</h1>
      <el-menu-item index="home">HOME</el-menu-item>
      <el-menu-item index="order">ORDERS</el-menu-item>
      <el-menu-item index="product">PRODUCT</el-menu-item>
    </el-menu>
    <div class="container"><router-view/></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: this.$route.name == 'root' ? 'home': this.$route.name,
    };
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
