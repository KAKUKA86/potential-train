export interface SearchWord{
    total?: number | null;
    pages?: number | null;
    current?: number | null;
    size?: number | null;
    searchWord?: string | null;
    wordListRecords?: Word[] | null;
}

export interface Word{
    wordId?: string | null;
    word?: string | null;
    dId?: number | null;
    hiragana?: string | null;
    romaji?: string | null;
    pronunciation?: string | null;
    paraphrases?: Paraphrase[] | null;
}

export interface Paraphrase{
    paraContentZh?: string | null;
    paraContentJa?: string | null;
    paraType?: string | null;
    illustrativeSentences?: IllustrativeSentence[] | null;
}

export interface IllustrativeSentence{
    paraId?: string | null;
    senContent?: string | null;
    senTrans?:string | null;
}