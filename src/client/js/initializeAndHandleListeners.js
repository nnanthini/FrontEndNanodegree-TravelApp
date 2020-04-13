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

        let postCallCheck = true;

        // If input destination is not a valid string, then alerts user.
        if (!Client.destinationValidator(destination)) {
            alert("Enter a valid destination")
            postCallCheck = false;
        }

        // If input date is not a future date, then alerts user.
        if (!Client.dateValidator(date)) {
            alert("Enter a valid date")
            postCallCheck = false;
        }

        // Fetch is called only if both destination and date entered by user is valid
        if(postCallCheck) {

            //Getting destination details
            fetch('http://localhost:8000/destinationDetails', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: destination })
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(`Result from server for POST call 'http://localhost:8000/destinationDetails'`)
                console.log(res);
                const locInfo = {
                    latitude: res.latitude,
                    longitude: res.longitude,
                    administration: res.administration,
                    country: res.country
                }
                if(locInfo.latitude === undefined) {
                    alert('Enter valid destination')
                    return;

                }else {
                    Client.contentAppend('locationInfo', locInfo)
                }
                
            })


            // Getting image details
            fetch('http://localhost:8000/imageDetails', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location: destination })
            })
            .then(res => res.json())
            .then(function(res) {
                console.log(`Result from server for POST call 'http://localhost:8000/imageDetails'`)
                console.log(res);
                const imgInfo = {
                    imgURL: res.imgURL,
                    imgWidth: res.imgWidth,
                    imgHeight: res.imgHeight
                }
                Client.contentAppend('imgInfo', imgInfo)
            })
        }
        
        
    }

}

export { eventListeners }
