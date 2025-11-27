interface CardProps {
  title: string;
}

function Card({ title }: CardProps) {
  /* const x = 'Hello there dog\'';
    const y = 'Hussein Zeaiter';
    const z = `${x} ${y}`; */

  return (
    <div className={`card`}>
      <h2>{title}</h2>
    </div>
  );
}

export default Card;
