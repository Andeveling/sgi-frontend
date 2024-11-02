
export const getValidationError = (errorCode: any) => { 
    const codeMatcher:Record<string, string> = {
        400 : "Invalid email address",
    }

    return codeMatcher[errorCode]
}