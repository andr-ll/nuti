import nuti from '../src';

const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

const objResult = 'some pretty object: {"number":2}';
const arrResult = 'some pretty array: ["f","o","o"]';

const bigObjResult = `some pretty big object: {
  "name": "andr-ii",
  "planet": "earth",
  "number": 100,
  "cars": [
    "bmw",
    "audi"
  ]
}`;

const bigArrResult = `some pretty big array: [
  "f",
  "o",
  "o",
  "b",
  "a",
  "r"
]`;

describe('prettyOut function test', () => {
  it('makes console.log pretty', () => {
    expect.assertions(5);
    const obj = {
      number: 2,
    };

    const bigObj = {
      name: 'andr-ii',
      planet: 'earth',
      number: 100,
      cars: ['bmw', 'audi'],
    };
    const arr = ['f', 'o', 'o'];
    const bigArr = [...arr, 'b', 'a', 'r'];

    nuti.prettyOut(obj, bigObj, arr, bigArr);

    console.log(`some pretty object: ${obj}`);
    console.log(`some pretty big object: ${bigObj}`);
    console.log(`some pretty array: ${arr}`);
    console.log(`some pretty big array: ${bigArr}`);

    console.log(`object without pretty out: ${{ someValue: 'some-value' }}`);

    const result = Array.from(logSpy.mock.calls.flat());

    expect(result[0]).toBe(objResult);
    expect(result[1]).toBe(bigObjResult);
    expect(result[2]).toBe(arrResult);
    expect(result[3]).toBe(bigArrResult);
    expect(result[4]).toBe('object without pretty out: [object Object]');
  });
});
