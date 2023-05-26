import { useSnackbar } from "notistack"

let useSnackbarRef;

export const SnackbarUtilitiesConfigurator = () => {
     useSnackbarRef = useSnackbar();
     return null
}

export const SnackbarUtilities = {
    toast(msg, variant){
        useSnackbarRef.enqueueSnackbar(msg, {variant})
    },
    success(mes){
        this.toast(mes, "success")    
    },
    error(mes){
        this.toast(mes, "error")
    },
    info(mes){
        this.toast(mes, "info")
    },
    warning(mes){
        this.toast(mes, "warning")
    }
}