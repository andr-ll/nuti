import nuti from '.';

const obj = { foo: 'bar', numb: 3 };
const arr = [2, 3, 4];
const bigObject = {
  value: 'some_string',
  numb: 2,
  color: 'green',
  quality: 'good',
};

console.log(
  `An object: ${obj}\nAn array: ${arr}\nAnd a bigObject: ${bigObject}`,
);

nuti.prettyOut();

console.log(
  `\n\nAn object: ${obj}\nAn array: ${arr}\nAnd a bigObject: ${bigObject}`,
);
