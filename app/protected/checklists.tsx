import CrudComponent from "@/shared/components/crud";

const initialUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const Screen = () => {
  return (
    <CrudComponent
      data={initialUsers}
      title="Checklists"
      targetKey="id"
      onItemAdd={(items) => ({
        id: items.length + 1,
        name: `Checklist ${items.length + 1}`,
      })}
      onItemDelete={(id) => console.log("Checklist removido:", id)}
    />
  );
};

export default Screen;
