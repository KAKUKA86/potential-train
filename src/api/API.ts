import axios from "axios";
import type {SearchWord} from "../types/DBtype.ts";

const API_URL = "http://localhost:8080" ;

export const fuzzySearchWordApi = (searchWord:SearchWord) => {
  return axios.post(`${API_URL}/search/fuzzy`, searchWord);
};

export const searchWordApi = (word_id:string) => {
  return axios.get(`${API_URL}/search/byWord?word_id=${word_id}`);
}