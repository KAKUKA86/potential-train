<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {reactive} from "vue";
import axios from 'axios';

const searchObj = reactive({
  word: ''
})

function submitSearch(){
  console.log("开始查询")
  console.log(searchObj.word)
  axios.post(
      "http://localhost:8080/search",
      {
        word : searchObj.word
      }).then((res:any)=>{
        console.log(res.status)
        if(res.status == 200){
          console.log(res.data.word)
        }
  })
}
</script>

<template>
  <el-container>
    <el-header>
      <div style="text-align: right;font-size: 15px">辞書モデル</div>
    </el-header>
    <el-main>
      <el-row justify="center" gutter="20" style="margin-top: 100px">
        <el-col span="6">
          <el-input
              v-model="searchObj.word"
              style="width: 500px"
              size="large"
              placeholder="查询单词"
              :prefix-icon="Search"/>
        </el-col>
        <el-col span="6">
          <el-button size="large" type="primary" @click="submitSearch()">查询</el-button>
        </el-col>
      </el-row>
      <el-row justify="center" style="margin-top: 20px">
        <el-col span="6">
          <el-card style="min-width: 587px;min-height: 250px" shadow="hover">
            <template #header><span>历史记录</span><span style="font-size: 10px;color: #737373">（仅显示最近6条）</span>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>