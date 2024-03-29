import axios from 'axios';

const url = "https://localhost:7287/api/Risk/";

export async function saveRisks(riskList) {
    return await axios
        .post(url+"create", riskList)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

export async function updateRisks(riskList) {
    return await axios
        .post(url+"update", riskList)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

export function getRisksByIdPlan(id) {
    const options = {
        method: "GET",
        withCredentials: false,
        url:
            url+"byIdPlan/"+
            id,
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

export async function deleteRisks(idList) {
    return await axios
        .post(url+"delete", idList)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

export function deleteAll(id) {
    const options = {
        method: "GET",
        withCredentials: false,
        url:
            url+
            id,
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