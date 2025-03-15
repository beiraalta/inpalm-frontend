import CrudComponent from "@/components/crud";

export default function Screen() {
  return (
    <CrudComponent
      itemKey="id"
      itemKeys={["name", "email"]}
      itemNames={["Name", "E-mail"]}
      title="Usuários"
      urlForm="/protected/users/form"
      urlGet="/accounts/"
      urlDelete="/accounts/"
    />
  );
}