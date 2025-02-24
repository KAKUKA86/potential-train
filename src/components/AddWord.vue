<script setup lang="ts">
import type {Word} from '../types/DBtype';
import {ref} from "vue";


const addWord = ref<Word>({})
</script>
<template>
    <el-row justify="center" style="margin-top: 200px" >
      <el-form :model="addWord" label-width="auto" style="max-width: 600px">
        <!--    添加单词-->
        <el-form-item label="单词">
          <el-input v-model="addWord.word" placeholder="请输入单词"></el-input>
        </el-form-item>
        <el-form-item label="发音">
          <el-input v-model="addWord.pronunciation" placeholder="请输入发音"></el-input>
        </el-form-item>
        <el-form-item label="释义">
            <el-input v-model="addWord.paraphrases" placeholder="请输入释义"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
</template>