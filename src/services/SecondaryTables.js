import axios from 'axios';

const url = "https://localhost:7287/api/Task/";

export function getOwners() {
    const options = {
        method: "GET",
        withCredentials: false,
        url:"https://localhost:7287/api/Task/owners"
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

export function getProjects() {
    const options = {
        method: "GET",
        withCredentials: false,
        url:url+"projects"
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

export function getProbability() {
    const options = {
        method: "GET",
        withCredentials: false,
        url:url+"probability"
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

export function getImpacts() {
    const options = {
        method: "GET",
        withCredentials: false,
        url:url+"impact"
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