let regEx = /^[a-zA-Z]+([ ][a-zA-Z]+)*$/;

test('123', () => {
    expect('123').not.toMatch(regEx);
});

test(' ', () => {
    expect(' ').not.toMatch(regEx);
});

test('%(', () => {
    expect('%(').not.toMatch(regEx);
});

test('\t', () => {
    expect('\t').not.toMatch(regEx);
});

test(' new york', () => {
    expect(' ').not.toMatch(regEx);
});

test('new     york', () => {
    expect(' ').not.toMatch(regEx);
});

test('New York', () => {
    expect('New York').toMatch(regEx);
})

test('chicago', () => {
    expect('chicago').toMatch(regEx);
});
  