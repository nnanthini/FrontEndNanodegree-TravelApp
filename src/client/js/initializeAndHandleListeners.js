function eventListeners() {

    console.log(`Adding submit event listener to form`);
    let formElement = document.getElementById('form');
    formElement.addEventListener('submit', handleFormSubmit);
    console.log(`Added submit event listener to form element`);

    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(`Inside form event handler function..
        User input destination and date are as follows...`);
        let destination = document.getElementById('location').value;
        console.log(destination);
        let date = document.getElementById('start-date').value;
        console.log(date);

        // If input destination is not a valid string, then alerts user.
        if (!Client.destinationValidator(destination)) {
            alert("Enter a valid destination")
        }

        // If input date is not a future date, then alerts user.
        if (!Client.dateValidator(date)) {
            alert("Enter a valid date")
        }
        
    }

}

export { eventListeners }
