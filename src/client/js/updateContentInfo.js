let contentInfo = {
  daysLeft: -1,
  dateOfTravel: {},
  locationInfo: {},
  imgInfo: {},
  weatherInfoCurrent: {},
  weatherInfoFuture: {}
};

function contentAppend(key, value) {
    contentInfo[key] = value;

    console.log(`Content to be updated in UI is `)
    for (let content in contentInfo) {
      console.log(content, contentInfo[content]);
    }

    // Only if all content is ready to be populated, DOM updation function will be called.
    if( !(contentInfo.daysLeft === -1) && !(JSON.stringify(contentInfo.dateOfTravel)=== '{}') && !(JSON.stringify(contentInfo.locationInfo)=== '{}') && !(JSON.stringify(contentInfo.imgInfo)=== '{}') &&
      ((JSON.stringify(contentInfo.weatherInfoCurrent) === '{}') && !(JSON.stringify(contentInfo.weatherInfoFuture) === '{}')) || 
      (!(JSON.stringify(contentInfo.weatherInfoCurrent) === '{}') && (JSON.stringify(contentInfo.weatherInfoFuture) === '{}')) ) {

        console.log(`Ready to update UI...`);        
        Client.updateUI(contentInfo);      
   }
}

// Resets all content info.
function contentClear() {
    console.log(`Clearing content info..`)

    for (let content in contentInfo) {
      if(contentInfo[content] === 'daysLeft') {
        contentInfo[content] = -1;
      }
      contentInfo[content] = {};
    }
}

export { contentAppend }
export { contentClear }