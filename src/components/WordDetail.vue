<template>
  <div class="word-more-info">
<!--    {{currentWord}}-->
    <el-row justify="start">
      <el-col>
        <el-row justify="start">
          <el-text class="word-title">{{ currentWord?.word}} {{ currentWord?.pronunciation }}</el-text>
        </el-row>
        <el-row justify="start">
          <el-text class="word-content">{{ currentWord?.hiragana }} | {{ currentWord?.romaji }}</el-text>
        </el-row>
        <div v-for="(wordItem, index) in currentWord?.paraphrases" :key="index">
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useWordStore } from '../store/useWordStore.ts';
import type { Word } from '../types/DBtype.ts';

const wordStore = useWordStore();
const { currentWord } = storeToRefs(wordStore);

const wordMoreInfo = ref<Word[]>([]);

watch(currentWord, (newVal) => {
  if (newVal) {
    wordMoreInfo.value = [newVal];
  }
});
</script>

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
