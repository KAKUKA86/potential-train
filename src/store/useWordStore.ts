import { defineStore } from "pinia";
import { Paraphrase } from './useParaphrasesStore';

export interface Word {
    wordId: string;
    word: string;
    dId: number;
    hiragana: string;
    romaji: string;
    pronunciation: string;
    paraphrases: Paraphrase[];
}

export const useWordStore = defineStore('wordStore', {
    state: () => ({
        data: [] as Word[],
    }),
    getters: {},
    actions: {}
});