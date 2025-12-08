import { useCountStore } from "../../stores/testZust/mainStore";
import { useGetCount, useIncCount } from "../../stores/testZust/useDiffStore";

function ComponentA() {
  /* const { count, inc } = useCountStore((s) => ({
    count: s.count,
    inc: s.inc,
  })); */

  const count = useGetCount();
  const inc = useIncCount();

  /* const count = useCountStore((s) => s.count);
  const inc = useCountStore((s) => s.inc); */

  console.log("comp a renderd");

  return (
    <div>
      <h3>Component A</h3>
      <p>Count: {count}</p>
      <button onClick={() => inc(5)}>increase count</button>
    </div>
  );
}

export default ComponentA;
