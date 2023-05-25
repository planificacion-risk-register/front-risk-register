import axios from "axios";

const url = "https://localhost:7287/api/User"


export async function saveUser(user) {
    return await axios
        .post(url, user)
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

export async function createUser(user){
    return await axios.post(url, user)
}