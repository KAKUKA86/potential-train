import { defineStore } from "pinia";
import {
    fuzzySearchWordApi,
    searchWordApi
} from "../api/API.ts";
import type {Paraphrase, SearchWord, Word} from "../types/DBtype.ts";
import {ElMessage} from "element-plus";

export const useWordStore = defineStore('wordStore', {
    state: () => ({
        dataList: [] as Word[],
        searchWord:{
            total: null,
            pages: null,
            current: null,
            size: null,
            searchWord: null,
            wordListRecords: [] as Word[],
        } as SearchWord,
        thatWordId:'',
        wordResult:[] as Paraphrase,
        currentWord:null as Word | null,
    }),
    getters: {},
    actions: {
        async fuzzySearchWord() {
            console.log(this.searchWord);
            // this.dataList = [];
            if (this.searchWord) {
                const {
                    data: {
                        status,
                        message,
                        list
                    }
                } = await fuzzySearchWordApi(this.searchWord);
                if (status === 200) {
                    this.dataList = list;
                    ElMessage.success(message);
                }
            }
        },
        async searchWordFun(word_id:string) {
            if (word_id) {
                const {
                    data: {
                        status,
                        message,
                        word
                    }
                } = await searchWordApi(word_id);
                if (status === 200) {
                    ElMessage.success(message);
                    console.log(word)
                    this.wordResult = word;
                }
            }
        }
    }
});