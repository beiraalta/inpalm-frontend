import { AccountService } from "./service";
import { crudAtom } from "@/shared/components/crud";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { DefaultLanguage } from "@/shared/constants/languages";
import { ExtendedAccountSchema } from "./custom_types";
import { InputField } from "@/shared/components/fields";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AccountFormComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new AccountService(), []);
  const { control, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(ExtendedAccountSchema),
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    setOnAdd();
    setOnEdit();
    if (crud.formData) {
      reset(crud.formData);
    }
  }, [crud.formData]);

  function setOnAdd() {
    setCrud((previous) => ({
      ...previous,
      onAdd: async (formData) => {
        await service.initialize();
        return await service.addAccount({
          name: formData.name,
          user: formData.user,
          password: formData.password,
        });
      },
    }));
  }

  function setOnEdit() {
    setCrud((previous) => ({
      ...previous,
      onEdit: async (targetValue, formData) => {
        await service.initialize();
        return await service.editAccount(targetValue, {
          name: formData.name,
          user: formData.user,
        });
      },
    }));
  }

  return (
    <CrudFormComponent
      title={DefaultLanguage.INFO.USER}
      // onSubmitClick={(onSubmit) => {
      //   console.log("onSubmit");
      //   handleSubmit((formData) => {
      //     console.log("onHandleSubmit");
      //     console.log(formData);
      //     onSubmit();
      //   });
      //   console.log(onSubmit);
      // }}
    >
      <InputField
        path="name"
        control={control}
        label={DefaultLanguage.INFO.NAME}
      />
      <InputField
        path="user"
        control={control}
        label={DefaultLanguage.INFO.EMAIL}
      />
      {!crud.isEditing && (
        <InputField
          path="password"
          control={control}
          label={DefaultLanguage.INFO.PASSWORD}
        />
      )}
      {!crud.isEditing && (
        <InputField
          path="confirmPassword"
          control={control}
          label={DefaultLanguage.INFO.CONFIRM_PASSWORD}
        />
      )}
    </CrudFormComponent>
  );
}
