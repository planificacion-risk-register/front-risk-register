import axios from "axios"
import { toastError } from "../components/utils/ToastNotify";

export const AxiosInterceptor = () => {

    const updateHeader = (request) => {
        const authToken = localStorage.getItem("token");
        console.log(authToken)
            const newHeaders = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            };
            request.headers = newHeaders
            return request
    };

    axios.interceptors.request.use((request) => {
        return updateHeader(request)
    });

    axios.interceptors.response.use(
        (response) => {
            console.log('god',response)
            return response
        },
        (error) => {
            toastError("Acceso denegado")
                window.location.href = "/";
                return Promise.reject(error)
        }
    )
}