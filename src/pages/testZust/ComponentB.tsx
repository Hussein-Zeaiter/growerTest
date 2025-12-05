import { useCountStore } from "../../stores/testZust/mainStore";

function ComponentB() {
  const name = useCountStore((s) => s.name);
  const count = useCountStore((s) => s.count);
  const chng = useCountStore((s) => s.chng);
  const inc = useCountStore((s) => s.inc);

  console.log("comp b renderd");

  return (
    <div>
      <h3>Component B</h3>
      <p>Name: {name}</p>
      <p>Count: {count}</p>
      <button onClick={chng}>change name</button>
      <button onClick={inc}>increase count</button>
    </div>
  );
}

export default ComponentB;
