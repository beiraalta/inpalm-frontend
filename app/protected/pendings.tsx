import CrudComponent from "@/components/crud";

const initialUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const Screen = () => {
  return (
    <CrudComponent
      data={initialUsers}
      title="Pendências"
      targetKey="id"
      onItemAdd={(items) => ({
        id: items.length + 1,
        name: `Pendência ${items.length + 1}`,
      })}
      onItemDelete={(id) => console.log("Pendência removida:", id)}
    />
  );
};

export default Screen;
