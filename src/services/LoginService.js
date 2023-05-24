import axios from "axios";

const url = "https://localhost:7287/api/Login"


export async function newLogin(login) {
    return await axios
        .post(url, login)
        .then((response) => {
            const data = response.data
            console.log(data)
            return data
        })
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

export async function loginGoogle(login) {
    return await axios
        .post(url+"/google", login)
        .then((response) => {
            const data = response.data
            console.log(data)
            return data
        })
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}