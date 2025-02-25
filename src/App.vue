<script setup lang="ts">
import HomeAsideView from "./components/HomeAsideView.vue";
import GlobalLogin from "./components/GlobalLogin.vue";
import { ref } from "vue";
import { useAuthStore } from "./store/auth.ts";
import {storeToRefs} from "pinia";

const mainSpanValue = ref(24);
const authStore = useAuthStore();
const{showLoginModal} = storeToRefs(authStore)//解构autnStore中的状态

</script>

<template>


  <el-dialog
      v-model="showLoginModal"
      title="登陆"
      width="500"
      align-center
      :close-on-click-modal="false"
  >
    <GlobalLogin />
  </el-dialog>

  <el-container>
    <el-aside class="scrollable-aside" style="width: 200px; height: 900px"><HomeAsideView /></el-aside>
    <el-main class="scrollable-main" style="background-color: #f4f4f4;">
      <el-row>
        <el-col :span="mainSpanValue"><router-view /></el-col>
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