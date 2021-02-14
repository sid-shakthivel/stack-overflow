exports.handleErrors = (error) => {
    console.log(error);
    return error.errors.reduce((allErrors, currentError) => {
        allErrors.push(currentError.msg);
        return allErrors;
    }, []);
};
