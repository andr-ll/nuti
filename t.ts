import nuti from '.';

(async () => {
  const result = await nuti.req.get('http://localhost:3000/bar');
  console.log(result);
})();
