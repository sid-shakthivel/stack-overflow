exports.handleErrors = (error) => {
    return error.errors.reduce((allErrors, currentError) => {
        allErrors.push(currentError.msg);
        return allErrors;
    }, []);
};
