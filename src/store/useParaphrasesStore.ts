import { defineStore } from 'pinia';

interface IllustrativeSentence {
    sentence: string;
}

export interface Paraphrase {
    paraContentZh: string;
    paraContentJa: string;
    paraType: string;
    illustrativeSentences: IllustrativeSentence[];
}

export const useParaphrasesStore = defineStore('paraphrasesStore', {
    state: () => ({
        paraphrases: [] as Paraphrase[],
    }),
    getters: {},
    actions: {}
});