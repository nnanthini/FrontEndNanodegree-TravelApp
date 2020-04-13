let contentInfo = {
  daysLeft: 0,
  locationInfo: {},
  imgInfo: {}
};
function contentAppend(key, value) {
    contentInfo[key] = value;

    console.log(`Content to be updated in UI is `)
    for (let content in contentInfo) {
        console.log(content, contentInfo[content]);
      }
}

export { contentAppend }