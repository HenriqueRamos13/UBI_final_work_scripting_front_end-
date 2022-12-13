import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function TeacherPage() {
  const {
    user: { email },
  }: { user: any } = useContext(AuthContext);

  return (
    <div className="p-4 flex flex-row items-center justify-center">
      <h1 className="text-3xl font-bold">Bem vindo {email}</h1>
    </div>
  );
}
