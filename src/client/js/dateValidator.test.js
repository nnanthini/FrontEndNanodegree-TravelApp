let date = new Date(2020, 4, 1);

let test1 = new Date(2020, 4, 20);
let test2 = new Date(2020, 4, 13);
let test3 = new Date(2020, 7, 10);

test('test1', () => {
    expect(Math.floor((test1.getTime()-date.getTime())/(1000 * 3600 * 24))).not.toBeLessThanOrEqual(15);
});

test('test2', () => {
    expect(Math.floor((test2.getTime()-date.getTime())/(1000 * 3600 * 24))).toBeLessThanOrEqual(15);
});

test('test3', () => {
    expect(Math.floor((test3.getTime()-date.getTime())/(1000 * 3600 * 24))).not.toBeLessThanOrEqual(15);
});

