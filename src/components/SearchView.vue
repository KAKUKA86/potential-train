<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import {useWordStore} from "../store/useWordStore.ts";
import {ElMessage, ElDialog} from "element-plus";
import router from "../router";
import {storeToRefs} from "pinia";
import type {Word} from "../types/DBtype.ts";

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

const wordStore = useWordStore()
const {searchWord, dataList,wordResult} = storeToRefs(wordStore)
const {fuzzySearchWord,searchWordFun} = wordStore
const dialogVisible = ref(false)
const resultVisible = ref(false)
const historyVisible = ref(true)
const moreInfoVisible = ref(false)
const resultJustify = ref('center')
const searchJustify = ref('center')
const state = ref('')
const leftSpan = ref(24)
const rightSpan = ref(0)
const wordMoreInfo = ref<Word[]>([])

const confirmCleanHistory = () => {
  dialogVisible.value = false;
  localStorage.removeItem("userHistory");
  router.go(0);
};

//开始搜索
function submitSearch() {
  if (state.value == '') {
    ElMessage.warning("请输入查询单词")
    return
  }
  searchWord.value!.searchWord = state.value
  searchWord.value!.current = searchObj.current
  searchWord.value!.size = searchObj.size
  fuzzySearchWord()
  userHistoryController()
  historyVisible.value = false
  resultVisible.value = true
}

//使用历史记录搜索

function historySearch(historySearch: string, cb: any) {
  const history = localStorage.getItem("userHistory")
  if (history) {
    userHistory.value = JSON.parse(history);
  }
  const results = history ? userHistory.value.filter((item) => item?.includes(historySearch)) : []
  cb(results)
}

//填充单词
function fillWord(item: string) {
  state.value = item
  submitSearch()
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
  userHistory.value = [...userHistory.value, searchWord.value.searchWord as string]
  localStorage.setItem("userHistory", JSON.stringify(userHistory.value))
}

//显示单词详细信息
function showMoreWordInfo(index: number) {
  leftSpan.value = 12
  rightSpan.value = 12
  moreInfoVisible.value = true
  wordMoreInfo.value = []
  wordMoreInfo.value = [dataList.value[index] as Word]
}

</script>

<template>
  <el-container>
    <el-header>
      <div style="text-align: right;font-size: 15px">辞書モデル</div>
    </el-header>
    <el-main>
      <el-row justify="start">
        <el-col :span="leftSpan">
          <!-- 搜索框 -->
          <el-row :justify="searchJustify" gutter="20" style="margin-top: 100px">
            <el-col span="6">
              <el-autocomplete
                  v-model="state"
                  :fetch-suggestions="historySearch"
                  @keyup.enter="submitSearch"
                  size="large"
                  clearable
                  placeholder="请输入单词"
                  @select="fillWord"
              >
                <template #suffix>
              <span style="float: right">
                <el-button size="small" type="danger" @click="dialogVisible = true">清除历史记录</el-button>
              </span>
                  <el-icon>
                    <Search/>
                  </el-icon>
                </template>
                <template #default="{item}">
                  <div class="name">{{ item }}</div>
                </template>
              </el-autocomplete>
            </el-col>
            <el-col span="6">
              <el-button size="large" type="primary" @click="submitSearch">查询</el-button>
            </el-col>
          </el-row>
          <!-- 结果集 -->
          <el-row :justify="resultJustify" style="margin-top: 20px;" v-show="resultVisible">
            <el-col span="6">
              <el-card style="width: 100% ;min-height: 250px;min-width: 500px" shadow="hover">
                <template #header><span>结果</span><span style="font-size: 10px;color: #737373"></span></template>
                <template #default>
                  <div v-for="(searchItem, index) in dataList" :key="index">
                    <el-card shadow="hover" style="margin-top: 10px">
                      <div style="font-size: 20px" @click="showMoreWordInfo(index);searchWordFun(searchItem.wordId as string)">
                        <el-text :style="`font-size: var(--el-font-size-extra-large)`">{{ searchItem.word }} |
                          {{ searchItem.hiragana }} {{ searchItem.pronunciation }}
                        </el-text>
                      </div>
                    </el-card>
                  </div>
                </template>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="rightSpan" v-show="moreInfoVisible">
          <!-- 单词详细信息 -->
          <div class="word-more-info">
            <el-row justify="start" v-for="(searchItem, index) in wordMoreInfo" :key="index">
              <el-col>
                <el-row justify="start">
                  <el-text class="word-title">{{ searchItem.word }} {{ searchItem.pronunciation }}</el-text>
                </el-row>
                <el-row justify="start">
                  <el-text class="word-content">{{ searchItem.hiragana }} | {{ searchItem.romaji }}</el-text>
                </el-row>
                <div v-for="(wordItem, index) in searchItem.paraphrases" :key="index">
                  <el-row justify="start">
                    <el-text class="word-content">{{ wordItem.paraContentZh }} | {{ wordItem.paraType }}</el-text>
                  </el-row>
                  <el-row justify="start" v-for="(contentItem, index) in wordItem.illustrativeSentences" :key="index">
                    <el-text class="example-sentence">{{ contentItem.senContent }} | {{ contentItem.senTrans }}</el-text>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
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
/* 单词详细信息区域 */
.word-more-info {
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 字体大小和颜色 */
.word-more-info .el-text {
  font-size: var(--el-font-size-large);
  color: #303133;
}

/* 详细信息标题 */
.word-more-info .word-title {
  font-size: 24px;
  margin-bottom: 10px;
}

/* 详细信息内容 */
.word-more-info .word-content {
  font-size: 16px;
  margin-bottom: 10px;
}

/* 示例句子 */
.word-more-info .example-sentence {
  font-size: 14px;
  color: #606266;
  margin-top: 10px;
}

/* 边距和间距 */
.word-more-info .el-row {
  margin-bottom: 10px;
}

/* 最后一个元素移除底部边距 */
.word-more-info .el-row:last-child {
  margin-bottom: 0;
}
</style>
