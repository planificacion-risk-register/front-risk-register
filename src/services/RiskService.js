import axios from 'axios';

const url = "http://localhost:4000/api/dummy/";

export async function saveRisks(riskList) {
    return await axios
        .post(url, riskList)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

export async function savePlan(plan) {
    return await axios
        .post(url+"plan", plan)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

export async function updateRisks(riskList) {
    return await axios
        .put(url, riskList)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}

export async function getByImpactProbability(probability, impact) {
    const data = {probability: probability, impact:impact}
    return await axios
        .post(url+"get", data)
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

export async function deleteRisks(idList) {
    return await axios
        .post(url+"delete", idList)
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error al guardar!", error);
        });
}