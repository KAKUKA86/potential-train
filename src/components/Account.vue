<template>
  <el-col span="24">
    <el-row justify="start">
      <el-text>{{username}}欢迎回来</el-text>
      <el-button type="primary" @click="logout">退出登录</el-button>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useAuthStore} from "../store/auth.ts";
const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
}
const username = ref('');
onMounted(()=>{
  username.value = localStorage.getItem('username') as string;
})

</script>
