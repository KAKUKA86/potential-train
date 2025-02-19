<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import axios from 'axios';
import {useWordStore} from "../store/useWordStore.ts";
import {ElMessage,ElDialog} from "element-plus";
import router from "../router";

const handleSpanValue = ref(0)
const searchObj = reactive({
  word: '',
  current: 1,
  size: 10
})
//本地用户历史记录
const userHistory = ref<string[]>([])

onMounted(() => {
  const history = localStorage.getItem("userHistory")
  if (history) {
    userHistory.value = JSON.parse(history);
  }
})

const inputWidth = ref('500px')

const wordStore = useWordStore()


function submitSearch() {
  if (searchObj.word == '') {
    ElMessage.warning("请输入查询单词")
    return
  }
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
    //数据处理
    if (res.status == 200) {
      wordStore.data = res.data

      const history = localStorage.getItem("userHistory")

      if (history) {
        userHistory.value = JSON.parse(history);
      }
      //若历史记录长度已经超过6条，则删除最早的一条
      if (userHistory.value.length >= 6) {
        userHistory.value.shift()
      }
      userHistory.value = [...userHistory.value, searchObj.word]
      localStorage.setItem("userHistory", JSON.stringify(userHistory.value))
      // 存储至
      // wordStore.data = res.data
      // //控制边距
      // handleSpanValue.value = 0
      // inputWidth.value = '200px'
      // //session控制
      // sessionStorage.setItem("handleSpanValue", handleSpanValue.value.toString())
      // //向localStory中存储历史记录
      // userHistory.words.push(searchObj.word)
      // console.log(userHistory.words)
      // localStorage.setItem("userHistory", JSON.stringify(userHistory.words))
      // const storeHistory = localStorage.getItem("userHistory")
      // const parsedHistory = JSON.parse(storeHistory)
      // console.log(parsedHistory)
    }
  })
}
// const handleSpanValue = ref(0)

const dialogVisible = ref(false)

const confirmCleanHistory = () => {
  dialogVisible.value = false;
  localStorage.removeItem("userHistory");
  router.go(0);
};

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
              :style="{width: inputWidth}"
              size="large"
              placeholder="查询单词"
              :prefix-icon="Search"
              @keyup.enter="submitSearch"/>
        </el-col>
        <el-col span="6">
          <el-button size="large" type="primary" @click="submitSearch">查询</el-button>
        </el-col>
      </el-row>
      <!--      结果集-->
      <el-row justify="center" style="margin-top: 20px" v-show="false">
        <el-col span="6">
          <el-card style="min-width: 587px;min-height: 250px" shadow="hover">
            <template #header><span>结果</span><span style="font-size: 10px;color: #737373">神</span></template>
          </el-card>
        </el-col>
      </el-row>
      <!--      历史记录-->
      <el-row justify="center" style="margin-top: 20px" v-show="true">
        <el-col span="6">
          <el-card style="min-width: 587px; min-height: 250px;" shadow="hover">
            <template #header>
              <span>历史记录</span>
              <span style="font-size: 10px; color: #737373;">（仅显示最近6条）</span>
              <span style="float: right"><el-button size="small" type="danger" @click="dialogVisible = true">清除历史记录</el-button></span>
            </template>
            <template #default>
              <el-timeline>
                <el-timeline-item v-for="(item, index) in userHistory" :key="index" color="blue">
                  {{ item }}
                </el-timeline-item>
              </el-timeline>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <el-dialog
      v-model="dialogVisible"
      title="确认清除"
      width="500"
  >
    <span>您确定要清除历史记录吗？</span>
    <template #footer><div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmCleanHistory">确认</el-button>
    </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>