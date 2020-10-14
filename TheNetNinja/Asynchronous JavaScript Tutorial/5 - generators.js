window.onload = () => {

  function* gen() {
    const x = yield 10;
    console.log(x);
  }

  const myGen = gen();
  console.log(myGen.next());
  console.log(myGen.next(10));

};