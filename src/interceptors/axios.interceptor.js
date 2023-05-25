import axios from "axios"
import { toastError, toastSuccesBlack } from "../components/utils/ToastNotify";

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
            //SnackbarUtilities.error(getValidationError(error.code))
            console.log('error de: ',error)
            const getGoogle = async () => {
                const google = localStorage.getItem("google")
                return google
            }

            if(error.response.status === 400){
                const googleResult = getGoogle()
                console.log("google response: ", googleResult)
                if(googleResult!==null){
                    toastSuccesBlack("Usuario de google ya existente")
                }else{
                    toastError(error.response.data.msg)
                }
            }else if(error.response.status === 401){
                toastError(`Accesso invalido ${error.code}`)
                setTimeout(function(){
                    window.location.href = "/";
                },1500)
            }
            //console.log("error", getValidationError(error.code))
                return Promise.reject(error)
        }
    )
}