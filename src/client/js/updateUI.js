// Updating DOM elements based on data from all API's.
function updateUI(content) {
    console.log(`Inside updateUI function..`)
    console.log(content);

    let image = document.getElementById('destination-img');
    image.src = content.imgInfo.imgURL;
    image.alt = content.locationInfo.place;
    image.width = content.imgInfo.imgWidth;
    image.height = content.imgInfo.imgHeight;
    image.style.objectFit = 'contain';

    let imageCaption = document.getElementById('destination-figcaption');
    imageCaption.innerText = content.locationInfo.place;

    let dataToBePopulated = []
    
    if(JSON.stringify(content.weatherInfoFuture) === '{}') {
        dataToBePopulated = [
            `${content.locationInfo.place}`,
            `Days till trip : ${content.daysLeft}`,
            `Weather Today : ${content.weatherInfoCurrent.weather}`,
            `Temperature Today : ${content.weatherInfoCurrent.temperature}C`
        ];
        createAndAppendElements(dataToBePopulated.length, 'p', dataToBePopulated, 'display-info')
        
    }else if (JSON.stringify(content.weatherInfoCurrent) === '{}'){
        let daysRem = content.daysLeft;
        dataToBePopulated = [
            `${content.locationInfo.place}`,
            `Days till trip : ${content.daysLeft}`,
            `Weather Forecast: ${content.weatherInfoFuture.weatherForecastFuture.data[daysRem].weather.description}`,
            `Temperature Forecast: ${content.weatherInfoFuture.weatherForecastFuture.data[daysRem].temp}C`
        ];
        createAndAppendElements(dataToBePopulated.length, 'p', dataToBePopulated, 'display-info')
        
    }


    let contentSection = document.getElementById('destination-content');
        
    // Button to add trips info to saved trips.
    let btn = document.createElement('button')
    btn.id = "btn-add-trip"
    btn.type = "button"
    btn.innerText = "Save Trip"
    btn.addEventListener('click', handleButtonClick);
    contentSection.appendChild(btn);
    console.log(`Added click event listener to button - Add Trip`);
    document.getElementById('info-begin').style.setProperty('display', 'flex')

    // Event handler function for 'Add-Trip' button click.
    function handleButtonClick(event) {
        event.preventDefault();
        console.log(`Inside Add Trip button click handler function`)

        let sectionToAddTrips = document.getElementById('saved-begin');

        let newSection = document.createElement('section');
        newSection.class = 'destination-card-group'

        let imgEle = document.createElement('img');
        let originalImgEle = document.getElementById('destination-img')
        imgEle.src = originalImgEle.src;
        imgEle.alt = originalImgEle.alt;
        imgEle.height = originalImgEle.height / 2;
        imgEle.width = originalImgEle.width / 2;
        imgEle.style.objectFit = 'contain';

        newSection.appendChild(imgEle);
        
        let divEle = document.createElement('div');
        let msg = ``
        for (let j = 0; j < dataToBePopulated.length; j++) {
            msg = msg + dataToBePopulated[j] + '\n';
        }
        divEle.innerText = msg;
        divEle.style.textAlign = "center"; 

        newSection.appendChild(divEle);

        // Button to remove trips from saved trips.
        let remBtn = document.createElement('button');
        remBtn.id = "btn-remove-trip"
        remBtn.type = "button"
        remBtn.innerText = "Remove Trip"
        remBtn.addEventListener('click', handleButtonClickRemove);
        newSection.appendChild(remBtn);
        console.log(`Added click event listener to button - Remove Trip`);        

        sectionToAddTrips.appendChild(newSection);

        document.getElementById('saved-begin').style.setProperty('display', 'flex')

        console.log(`Saved Trip section outerhtml`)
        console.log(`${sectionToAddTrips.outerHTML}`)
        document.getElementById('info-begin').style.setProperty('display', 'none')
    }

    // Event handler function for Remove Button click.
    function handleButtonClickRemove(event) {
        console.log(`Inside Remove Saved Trip button click function`)

        let node = event.target;
        let eleToBeRemoved

        if(node.parentNode.parentNode.childElementCount === 1) {
            eleToBeRemoved = node.parentNode.parentNode;
            eleToBeRemoved.innerHTML = ""
        }
        else{
            eleToBeRemoved = node.parentNode;
            eleToBeRemoved.outerHTML = ""
        }

        eleToBeRemoved.style.setProperty('display', 'none')
    }

    /* Function to create elements and append them to DOM
    count - no of elements of type 'ele' to be created.
    ele - type of element to be created.
    data - data to be populated in innerText of the created element. 
    className - class name of the elememnt. */
    function createAndAppendElements(count, ele, data, className) {

        let contentSection = document.getElementById('destination-content');
        contentSection.innerHTML = "";
    
        let docFrag = document.createDocumentFragment();
        for (let i = 0; i < count; i++) {
            let p = document.createElement(ele);
            p.innerText = data[i];
            p.classList.add(className);
            if (i === 0) {
                p.id = 'first-ele';
                p.style.setProperty('font-size', '1.2em');
                p.style.setProperty('font-weight', 'bold');
            }
            docFrag.appendChild(p);
        }
        contentSection.appendChild(docFrag);
    }

}

export { updateUI }