import minus from "../../../../assets/product/icon-minus.svg";
import plus from "../../../../assets/product/icon-plus.svg";

import style from "./Counter.module.css";

interface CounterProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

function Counter({ count, setCount }: CounterProps) {
  return (
    <div className={style.counterMain}>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
        disabled={count === 0}
      >
        <img src={minus} alt="minus" />
      </button>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        <img src={plus} alt="plus" />
      </button>
    </div>
  );
}

export default Counter;
