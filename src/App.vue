<script setup lang="ts">
import HomeAsideView from "./components/HomeAsideView.vue";
</script>

<template>
  <el-container>
    <el-aside style="width: 200px;height: 900px"><HomeAsideView/></el-aside>
    <el-main style="background-color: #f4f4f4;"><router-view/></el-main>
  </el-container>
</template>
<style scoped>
</style>
