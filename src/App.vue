<script setup lang="ts">
import HomeAsideView from "./components/HomeAsideView.vue";
import {ref} from "vue";
const mainSpanValue = ref(24)
</script>

<template>
  <el-container>
    <el-aside class="scrollable-aside" style="width: 200px;height: 900px"><HomeAsideView/></el-aside>
    <el-main class="scrollable-main"  style="background-color: #f4f4f4;">
      <el-row>
        <el-col :span="mainSpanValue"><router-view/></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style scoped>
.scrollable-main {
  overflow: auto;
}
.scrollable-aside {
  overflow: auto;
}
</style>
