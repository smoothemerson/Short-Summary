import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm"

export const server = axios.create({
    baseURL: "http://localhost:3333",
})
