function ErrorMessage({ message }: { message: string }) {
  return (
    <p style={{ color: "red", fontSize: "12px", fontWeight: "bolder" }}>
      {message}
    </p>
  );
}

export default ErrorMessage;
