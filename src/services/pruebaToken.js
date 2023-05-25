import axios from "axios";
const url = "https://localhost:7287/api/User"


export function getUsers(){
    return axios.get(url)
}