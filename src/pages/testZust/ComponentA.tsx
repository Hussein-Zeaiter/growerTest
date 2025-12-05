import { useCountStore } from "../../stores/testZust/mainStore";

function ComponentA() {
  /* const { count, inc } = useCountStore((s) => ({
    count: s.count,
    inc: s.inc,
  })); */

  const count = useCountStore((s) => s.count);
  const inc = useCountStore((s) => s.inc);

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
