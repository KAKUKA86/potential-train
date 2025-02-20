<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import axios from 'axios';
import {useWordStore} from "../store/useWordStore.ts";
import {ElMessage, ElDialog} from "element-plus";
import router from "../router";

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

const dialogVisible = ref(false)
const resultVisible = ref(false)
const historyVisible = ref(true)

const confirmCleanHistory = () => {
  dialogVisible.value = false;
  localStorage.removeItem("userHistory");
  router.go(0);
};

//开始搜索
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
      resultVisible.value = true
      historyVisible.value = false
      userHistoryController()
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

function userHistoryController() {
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
              :style="{
                width: inputWidth
              }"
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
      <el-row justify="center" style="margin-top: 20px" v-show="resultVisible">
        <el-col span="6">
          <el-card style="min-width: 587px;min-height: 250px" shadow="hover">
            <template #header><span>结果</span><span style="font-size: 10px;color: #737373"></span></template>
            <template #default>
              <div v-for="(item, index) in wordStore.data.data" :key="index">
                <el-card shadow="hover" style="margin-top: 10px">
                  <div style="font-size: 20px" @click="">{{ item.word }} | {{ item.hiragana }}
                    {{ item.pronunciation }}
                  </div>
                </el-card>
              </div>
            </template>
          </el-card>
        </el-col>
      </el-row>


      <!--      历史记录-->
      <el-row justify="center" style="margin-top: 20px" v-show="historyVisible">
        <el-col span="6">
          <el-card style="min-width: 587px; min-height: 250px;" shadow="hover">
            <template #header>
              <span>历史记录</span>
              <span style="font-size: 10px; color: #737373;">（仅显示最近6条）</span>
              <span style="float: right">
                <el-button size="small" type="danger" @click="dialogVisible = true">清除历史记录</el-button>
              </span>
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
      width="500">
    <span>您确定要清除历史记录吗？</span>
    <template #footer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmCleanHistory">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>