import type { User } from "../../hooks/useUsers";

export default function PTableRow({ u }: { u: User }) {
  return (
    <tr key={u.id}>
      <td>{u.id}</td>
      <td>
        {u.first_name} {u.last_name}
      </td>
      <td>{u.email}</td>
      <td>
        <img src={u.avatar} style={{ borderRadius: "50%", height: "30px" }} />
      </td>
    </tr>
  );
}
