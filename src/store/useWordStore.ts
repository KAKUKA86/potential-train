import {defineStore} from "pinia";

interface data {
    data : word[]
}

interface word {
    wordId: string,
    word: string,
    dId: number,
    hiragana: string,
    romaji: string,
    pronunciation: string,
    paraphrases: [];

}

export const useWordStore = defineStore('wordStore', {
    state: () => ({
        data: {} as data,
    }),
    getters: {},
    actions: {}
})