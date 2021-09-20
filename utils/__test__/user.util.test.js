const { nameNormalizator } = require('../user.util');

const expectedName = 'John Doe';

const nameNormalizatorTestData = [
    { input: 'JOHN DOE', output: expectedName },
    { input: 'John Doe', output: expectedName },
    { input: 'john doe', output: expectedName },
    { input: 'johN doE', output: expectedName },
    { input: 'johN-doE', output: expectedName },
    { input: 'johN      doE', output: expectedName },
    { input: 'johN   -@-   doE', output: expectedName },
    { input: 'johN   -@-   doé', output: expectedName },
    { input: 'johN doé', output: expectedName },
    { input: 'john.doe', output: expectedName },
    { input: 'J0hn Doe', output: 'J0hn Doe' },
    { input: undefined, output: '' },
    { input: null, output: '' },
    { input: '', output: '' },
    { input: '+380771234567', output: '380771234567' }, // will not work for phone numbers
    { input: 'email@gmail.com', output: 'Email Gmail Com' }, // will not work for emails
];

describe('Test user util', () => {
    test('Should return normalized name', () => {
        nameNormalizatorTestData.forEach((testObject) => {
            const normalizedName = nameNormalizator(testObject.input);
            expect(normalizedName).toBe(testObject.output);
        });
    });
});
