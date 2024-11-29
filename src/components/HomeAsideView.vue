<script setup lang="ts">
import {
  List,
  Collection,
  Search,
  Setting,
  Failed
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div style="font-size: 25px;font-weight: bold;text-align: center;color: #004173;margin-top: 20px" class="mb-2">辞書　じしょ</div>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="margin-top: 20px"
  >
    <el-menu-item index="1">
      <el-icon>
         <Search />
      </el-icon>
      <span>搜索</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon>
        <Collection />
      </el-icon>
      <span>收藏</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><List /></el-icon>
      <span>词单</span>
    </el-menu-item>
    <hr>
    <el-menu-item index="4">
      <el-icon>
        <setting/>
      </el-icon>
      <span>我的</span>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon><Failed /></el-icon>
      <span>反馈</span>
    </el-menu-item>
  </el-menu>
</template>


<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>