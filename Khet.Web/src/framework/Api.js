import axios from 'axios'
export const BASE = "http://localhost:3000";
export const FAKE_URL = "https://jsonplaceholder.typicode.com/posts"

export default class Api {
    static async get(url){
        //return await axios.get(`${BASE}${url}`);
        return await axios.get(FAKE_URL)
    }
}