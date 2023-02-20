## Description

The deep objects/arrays clone helper. Includes all the types annotation after object was cloned.
Keeps `Date`, `Infinity`, `Map`, `Set`, `NaN` values types as they were in the given object/array.
Removes all methods from class instances.

## Usage

### Clone an object:

```ts
const some = {
  numb: 123,
  date: new Date(),
};

const clone = nuti.clone(some);

console.log(clone === some); // false
console.log(clone.numb === some.numb); // true
console.log(clone.date instanceof Date); // true
```

### Clone an instance of a Class:

```ts
class SomeClass {
  name = 'some-name';
  date = new Date();

  sayHi() {
    return 'class says hi!';
  }
}

const classInstance = new SomeClass();
const clone = nuti.clone(classInstance);

console.log(clone === classInstance); // false
console.log(clone.name === classInstance.name); // true
console.log(clone.date instanceof Date); //true
console.log(clone.sayHi); // undefined
```
