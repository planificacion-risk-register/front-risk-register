import axios from "axios";

const url = "https://localhost:7287/api/Login"


export async function newLogin(login) {
    try{
        const response = await axios.post(url, login)
        console.log(response.data)
        return response
    }catch(error){
        console.log(error)
        return error
    }
}

export async function loginPage(login){
    return await axios.post(url, login)
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
            const response = error
            return response
        });
}