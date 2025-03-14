import CrudComponent from "@/components/crud";

const initialUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const UsersScreen = () => {
  return (
    <CrudComponent
      data={initialUsers}
      title="Usuários"
      itemKey="id"
      onItemAdd={(items) => ({
        id: items.length + 1,
        name: `Usuário ${items.length + 1}`,
      })}
      onItemDelete={(id) => console.log("Usuário removido:", id)}
    />
  );
};

export default UsersScreen;
