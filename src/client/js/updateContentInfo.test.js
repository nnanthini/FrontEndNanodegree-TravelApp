let contentInfo = {
    daysLeft: -1,
    dateOfTravel: {},
    locationInfo: {},
    imgInfo: {},
    weatherInfoCurrent: {},
    weatherInfoFuture: {}
};

let test1 = {
    daysLeft: -1,
    dateOfTravel: {},
    locationInfo: {},
    imgInfo: {},
    weatherInfoCurrent: {}
}

let test2 = {
    daysLeft: -1,
    dateOfTravel: {},
    locationInfo: {},
    imgInfo: {},
    weatherInfoFuture: {}
}


test('the shopping list has beer on it', () => {
    expect(contentInfo).toMatchObject(test1);
    expect(contentInfo).toMatchObject(test2);
    })
