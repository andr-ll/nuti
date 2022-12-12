## Description

Boolean state of some action.
Only has value `true` or `false`, and if turned to `true` - keeps this state.
Can be used when different instances depend on each other.

## Usage

```ts
const flag = nuti.makeFlag();

// Pretend that some action will happen in 5 sec and the `flag` will be set to `done`
setTimeout(() => {
  flag.setDone();
}, 5000);

// Use async function to find out when `flag` is set to `done`
flag.waitDone().then(() => console.log('flag has been set as "done"'));

// Check each second for `flag` to be done;
const intervalId = setInterval(() => {
  console.log(flag.done);

  if (flag.done) {
    clearInterval(intervalId);
  }
}, 1000);
```

Output:

```log
false
false
false
false
flag has been set as "done"
true
```
