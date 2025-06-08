import { RolePolicy, RoleSchema } from "./custom_types";
import { RoleService } from "./service";
import { crudAtom } from "./atom";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { defaultLanguage } from "@/shared/constants/languages";
import { InputField, PickerField } from "@/shared/components/fields";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function RoleFormComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new RoleService(), []);
  const schema = RoleSchema;
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      default_policy: RolePolicy.DENY,
      policy_exceptions: [],
      accounts: [],
      configs: [],
      resource_policies: {},
    },
    mode: "onSubmit",
    resolver: zodResolver(schema),
    reValidateMode: "onSubmit",
  });

  function setOnAdd() {
    setCrud((previous) => ({
      ...previous,
      onAdd: async (formData) => {
        await service.initialize();
        return await service.addRole({
          name: formData.name,
          default_policy: formData.default_policy,
          policy_exceptions: [],
          accounts: [],
          configs: [],
          resource_policies: {},
        });
      },
    }));
  }

  function setOnEdit() {
    setCrud((previous) => ({
      ...previous,
      onEdit: async (targetValue, formData) => {
        await service.initialize();
        return await service.editRole(targetValue, {
          name: formData.name,
          default_policy: formData.default_policy,
          policy_exceptions: [],
          accounts: [],
          configs: [],
          resource_policies: {},
        });
      },
    }));
  }

  useEffect(() => {
    setOnAdd();
    setOnEdit();
    if (crud.formData) {
      reset(crud.formData);
    }
  }, [crud.formData]);

  return (
    <CrudFormComponent
      crudAtom={crudAtom}
      title={defaultLanguage.INFO.ROLE}
      onClickSubmitButton={handleSubmit(async (formData) => {
        await crud.onSubmit(formData);
      })}
    >
      <InputField
        control={control}
        label={defaultLanguage.INFO.NAME}
        path="name"
      />
      <PickerField
        control={control}
        label={defaultLanguage.INFO.DEFAULT_POLICY}
        path="default_policy"
        options={[
          { value: RolePolicy.ALLOW, label: defaultLanguage.INFO.ALLOW },
          { value: RolePolicy.DENY, label: defaultLanguage.INFO.DENY },
        ]}
      />
    </CrudFormComponent>
  );
}
