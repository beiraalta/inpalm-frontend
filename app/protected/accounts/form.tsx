import { AccountSchema, AddAccountSchema } from "./custom_types";
import { AccountService } from "./service";
import { crudAtom } from "@/shared/components/crud";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { DefaultLanguage } from "@/shared/constants/languages";
import { InputField } from "@/shared/components/fields";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AccountFormComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new AccountService(), []);
  const schema = crud.isEditing? AccountSchema : AddAccountSchema;
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      user: "",
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

  useEffect(() => {
    setOnAdd();
    setOnEdit();
    if (crud.formData) {
      reset(crud.formData);
    }
  }, [crud.formData]);

  return (
    <CrudFormComponent
      title={DefaultLanguage.INFO.USER}
      onClickSubmitButton={handleSubmit(async (formData) => {
        await crud.onSubmit(formData);
      },
    
    
      (formData) => {
       console.log(formData); 
      }


    )}
    >
      <InputField
        control={control}
        label={DefaultLanguage.INFO.NAME}
        path="name"
      />
      <InputField
        control={control}
        label={DefaultLanguage.INFO.EMAIL}
        path="user"
      />
      {!crud.isEditing && (
        <InputField
          control={control}
          isSecure={true}
          label={DefaultLanguage.INFO.PASSWORD}
          path="password"
        />
      )}
      {!crud.isEditing && (
        <InputField
          control={control}
          isSecure={true}
          label={DefaultLanguage.INFO.CONFIRM_PASSWORD}
          path="confirmPassword"
        />
      )}
    </CrudFormComponent>
  );
}
