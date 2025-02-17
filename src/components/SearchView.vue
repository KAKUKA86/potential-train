<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import axios from 'axios';
import {useWordStore} from "../store/useWordStore.ts";

const handleSpanValue = ref(0)
const searchObj = reactive({
  word: '',
  current: 1,
  size: 10
})
const userHistory = {
  words:['']
}


const wordStore = useWordStore()



function submitSearch() {
  console.log("开始查询")

  axios.post(
      "http://localhost:8080/search/fuzzy",
      {
        searchWord: searchObj.word,
        current: searchObj.current,
        size: searchObj.size
      }).then((res: any) => {
    console.log(res.status)
    console.log(res.data)

    if (res.status == 200) {
      wordStore.data = res.data
      //控制边距
      handleSpanValue.value = 0
      //session控制
      sessionStorage.setItem("handleSpanValue", handleSpanValue.value.toString())
      //向localStory中存储历史记录
      userHistory.words.push(searchObj.word)
      console.log(userHistory.words)
      localStorage.setItem("userHistory", JSON.stringify(userHistory))
      const storeHistory = localStorage.getItem("userHistory")
      const parsedHistory = JSON.parse(storeHistory)
      console.log(parsedHistory)
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
              style="width: 500px;"
              size="large"
              placeholder="查询单词"
              :prefix-icon="Search"
              @keyup.enter="submitSearch"/>
        </el-col>
        <el-col span="6">
          <el-button size="large" type="primary" @click="submitSearch()">查询</el-button>
        </el-col>
      </el-row>
      <!--      结果集-->
      <el-row justify="center" style="margin-top: 20px" v-show="true">
        <el-col span="6">
          <el-card style="min-width: 587px;min-height: 250px" shadow="hover">
            <template #header><span>结果</span><span style="font-size: 10px;color: #737373">神</span></template>
          </el-card>
        </el-col>
      </el-row>
      <!--      历史记录-->
      <el-row justify="center" style="margin-top: 20px" v-show="false">
        <el-col span="6">
          <el-card style="min-width: 587px;min-height: 250px" shadow="hover">
            <template #header><span>历史记录</span><span style="font-size: 10px;color: #737373">（仅显示最近6条）</span>
            </template>
            <template #default>
              <div class="history-box" v-for="(item) in parsedHistory">
                {{ item }}
              </div>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>