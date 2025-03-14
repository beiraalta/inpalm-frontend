import CrudComponent from "@/components/crud";

const initialUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const UsersScreen = () => {
  return (
    <CrudComponent 
      data={initialUsers}
      title="Grupos"
      itemKey="id"
      onItemAdd={(items) => ({ id: items.length + 1, name: `Grupo ${items.length + 1}` })}
      onItemDelete={(id) => console.log("Grupo removido:", id)}
    />
  );
};

export default UsersScreen;