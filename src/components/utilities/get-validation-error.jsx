export const getValidationError = (errorCode) => {
    const codeMatcher = {
        ERR_BAD_REQUEST: "Error en la red",
    };

    return codeMatcher[errorCode];
};