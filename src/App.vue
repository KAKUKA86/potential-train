<script setup lang="ts">
import HomeAsideView from "./components/HomeAsideView.vue";
import {ref} from "vue";
const mainSpanValue = ref(24)
const searchSpanValue = ref(0)
const status = ref(Number(sessionStorage.getItem("handleSpanValue")))
function handleSpanValueChange() {
  if (status.value == 0) {
    mainSpanValue.value = 24;
    searchSpanValue.value = 0;
    return false
  }else{
    mainSpanValue.value = 24/2;
    searchSpanValue.value = 24/2;
    return true
  }
}

</script>

<template>
  <el-container>
    <el-aside style="width: 200px;height: 900px"><HomeAsideView/></el-aside>
    <el-main style="background-color: #f4f4f4;">
      <el-row>
        <el-col :span="mainSpanValue"><router-view/></el-col>
        <el-col :span="searchSpanValue" v-if="handleSpanValueChange()">123</el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<style scoped>
</style>
