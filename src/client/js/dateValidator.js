// Checks if user input date is ahead in time and is withing 16 days from today (Weatherbit provides forecast for a max of 16 days only)
function dateValidator(date) {
    
    let dateToday = new Date();

    let userYear = parseInt(date.slice(0,4));
    let userMonth = parseInt(date.slice(5,7));
    let userDate = parseInt(date.slice(8));
    let dateUser = new Date(userYear, userMonth-1, userDate, 23, 59, 59, 999);

    console.log(`User Input Date is ${dateUser}`);
    console.log(`Todays Date is ${dateToday}`);

    if ((dateUser.getTime() >= dateToday.getTime()) && (date.length < 11)) {
        let differenceInTime = dateUser.getTime() - dateToday.getTime(); 
  
        // To calculate the no. of days between two dates 
        let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); 
        
        //To display the final no. of days (result) 
        console.log("Total number of days between dates  <br>"
        + dateUser + "<br> and <br>" 
        + dateToday + " is: <br> " 
        + differenceInDays); 

        if(differenceInDays >= 16 ) {
            return false;
        } else {
            fetch('http://localhost:8000/updateContent', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ diffInDays: differenceInDays })
            })
            .then(res => res.text())
            .then(function(res) {
                console.log(`Result from server for POST call 'http://localhost:8000/updateContent'`)
                console.log(res);                
            })
            Client.contentAppend('daysLeft', differenceInDays)
            let dateOfTravel = {
                dateString: date,
                dateObject: dateUser
            }
            Client.contentAppend('dateOfTravel', dateOfTravel)
            return true;
        }
    } else {
        return false;
    }
}

export { dateValidator }