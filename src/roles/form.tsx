import { crudAtom } from "./atom";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { defaultLanguage } from "@/shared/constants/languages";
import {
  MultiSelectField,
  InputField,
  PickerField,
} from "@/shared/components/fields";
import { RolePolicy, RoleSchema, RoleValidationSchema } from "./custom_types";
import { RoleService } from "./service";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "zod";

export function RoleFormComponent() {
  const [accounts, setAccounts] = useState<{ id: string; name: string }[]>([]);
  const [accountOptions, setAccountOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [resources, setResources] = useState<{ id: string; name: string }[]>(
    []
  );
  const [resourceOptions, setResourceOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new RoleService(), []);
  const schema = RoleValidationSchema;
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      default_policy: RolePolicy.DENY,
      policy_exceptions: [],
      accounts: [],
      configs: [{ id: "6522e8b5eac7cda9417c16f8", name: "Beira Alta" }],
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
          policy_exceptions: formData.policy_exceptions,
          accounts: formData.accounts,
          configs: formData.configs,
          resource_policies: formData.resource_policies,
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
          policy_exceptions: formData.policy_exceptions,
          accounts: formData.accounts,
          configs: formData.configs,
          resource_policies: formData.resource_policies,
        });
      },
    }));
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      await service.initialize();
      const accountList = await service.findAccounts();
      const sortedAccounts = accountList
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((account) => ({
          label: account.name,
          value: account.id,
        }));
      setAccounts(accountList);
      setAccountOptions(sortedAccounts);
    };
    const fetchResources = async () => {
      await service.initialize();
      const resourceList = await service.findResources({
        ignores_policy: false,
      });
      const sortedResources = resourceList
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((resource) => ({
          label: resource.name,
          value: resource.id,
        }));
      setResources(resourceList);
      setResourceOptions(sortedResources);
    };
    fetchAccounts();
    fetchResources();
    setOnAdd();
    setOnEdit();
    if (crud.formData && Object.keys(crud.formData).length > 0) {
      reset({
        ...crud.formData,
        accounts: crud.formData.accounts
          ? crud.formData.accounts.map((a) => a.id)
          : [],
        policy_exceptions: crud.formData.policy_exceptions
          ? crud.formData.policy_exceptions.map((r) => r.id)
          : [],
      });
    }
  }, [crud.formData]);

  return (
    <CrudFormComponent
      crudAtom={crudAtom}
      title={defaultLanguage.INFO.ROLE}
      onClickSubmitButton={handleSubmit(async (formData) => {
        debugger;
        console.log("Form Data:", formData);
        const selectedAccounts = accounts.filter((a) =>
          formData.accounts.includes(a.id)
        );
        const selectedExceptions = resources.filter((r) =>
          formData.policy_exceptions.includes(r.id)
        );
        formData.accounts = selectedAccounts.map((account) => ({
          id: account.id,
          name: account.name,
        }));
        formData.policy_exceptions = selectedExceptions.map((resource) => ({
          id: resource.id,
          name: resource.name,
        }));;
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
      <MultiSelectField
        control={control}
        path="accounts"
        label={defaultLanguage.INFO.USERS}
        options={accountOptions}
      />
      <MultiSelectField
        control={control}
        path="policy_exceptions"
        label={defaultLanguage.INFO.POLICY_EXCEPTIONS}
        options={resourceOptions}
      />
    </CrudFormComponent>
  );
}
