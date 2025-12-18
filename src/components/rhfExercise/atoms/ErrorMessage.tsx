function ErrorMessage({ message }: { message: string | undefined }) {
  return (
    <p
      style={{
        color: "red",
        fontSize: "12px",
        fontWeight: "bolder",
        margin: 0,
      }}
    >
      {message}
    </p>
  );
}

export default ErrorMessage;
