function dateValidator(date) {

    // Checks if user input date is in future
    let dateToday = new Date();

    let userYear = parseInt(date.slice(0,4));
    let userMonth = parseInt(date.slice(5,7));
    let userDate = parseInt(date.slice(8));
    let dateUser = new Date(userYear, userMonth-1, userDate);

    console.log(`User Input Date is ${dateUser}`);
    console.log(`Todays Date is ${dateToday}`);

    if (dateUser.getTime() >= dateToday.getTime()) {
        return true;
    } else {
        return false;
    }
}

export { dateValidator }