import axios from 'axios';

const url = "https://localhost:7287/api/Task/";

export async function saveTask(plan) {
    return await axios
        .post(url, plan)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

export async function updateTask(plan) {
    return await axios
        .put(url, plan)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

/*export function getPlans() {
    const options = {
        method: "GET",
        withCredentials: false,
        url:url
    };
    return axios
        .request(options)
        .then((response) => {
            const res = response.data;
            return res;
        })
        .catch(function (error) {
            console.error(error);
        });
}*/

export async function getPlans(){
    return await axios.get(url)
}

export function getPlanById(id) {
    const options = {
        method: "GET",
        withCredentials: false,
        url:url+id
    };
    return axios
        .request(options)
        .then((response) => {
            const res = response.data;
            return res;
        })
        .catch(function (error) {
            console.error(error);
        });
}

export function deletePlan(id) {
    const options = {
        method: "DELETE",
        withCredentials: false,
        url:
            url +id
    };
    console.log(options);
    return axios
        .request(options)
        .then((response) => {
            const res = response.data;
            return res;
        })
        .catch(function (error) {
            console.error(error);
        });

}
