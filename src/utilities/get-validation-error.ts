
export const getValidationError = (errorCode: any) => { 
    const codeMatcher: Record<string, string> = {
      ERR_BAD_REQUEST: 'Invalid credentials',
      ERR_UNAUTHORIZED: 'Invalid credentials',
      ERR_NOT_FOUND: 'Invalid credentials',
      ERR_INTERNAL_SERVER: 'Something went wrong',
    };

    return codeMatcher[errorCode]
}