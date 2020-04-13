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
        let Difference_In_Time = dateUser.getTime() - dateToday.getTime(); 
  
        // To calculate the no. of days between two dates 
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        
        //To display the final no. of days (result) 
        console.log("Total number of days between dates  <br>"
                    + dateUser + "<br> and <br>" 
                    + dateToday + " is: <br> " 
                    + Math.ceil(Difference_In_Days)); 

        //document.getElementById('')
        Client.contentAppend('daysLeft', Math.ceil(Difference_In_Days))
        return true;
    } else {
        return false;
    }
}

export { dateValidator }