import { useCount, useStateActions } from "../../stores/testZust/mainStore";
/* import { useGetCount, useIncCount } from "../../stores/testZust/useDiffStore"; */

function ComponentA() {
  /* const { count, inc } = useCountStore((s) => ({
    count: s.count,
    inc: s.inc,
  })); */

  /*   const count = useGetCount();
  const inc = useIncCount(); */

  //the console thing to test selector re-runs, check with Celine
  /* const count = useCountStore((s) => {
    console.log("Selector 1 ran");
    return s.count;
  }); */

  const count = useCount();
  const { inc } = useStateActions();

  console.log("comp a renderd");

  return (
    <div>
      <h3>Component A</h3>
      <p>Count: {count}</p>
      <button onClick={inc}>increase count</button>
    </div>
  );
}

export default ComponentA;
