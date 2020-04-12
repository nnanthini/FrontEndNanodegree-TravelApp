function destinationValidator(destination) {
    
    // Validates user input destination to contain only alphabets and single space.
    let regEx = /^[a-zA-Z]+([ ][a-zA-Z]+)*$/;
    if (regEx.test(destination)) {
        return true;
    }
    else {
        return false;
    }
}

export { destinationValidator }