export default function Error({ err }: { err: string | null }) {
  return <div role="alert">Error: {err}</div>;
}
