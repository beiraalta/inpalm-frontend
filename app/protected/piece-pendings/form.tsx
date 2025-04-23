import { buttonStyle } from "@/shared/components/buttons/styles";
import { crudAtom } from "./atom";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { defaultLanguage } from "@/shared/constants/languages";
import { DetailCard } from "@/shared/components/card";
import {
  DateTimeField,
  DynamicListField,
  InputField,
  PickerField,
} from "@/shared/components/fields";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { isLoadingAtom } from "@/shared/components/spinner";
import { PiecePendingSchema, PiecePendingListSchema } from "./custom_types";
import { PiecePendingService } from "./service";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PiecePendingsFormComponent() {
  const [checklists, setChecklists] = useState([]);
  const [checklistOptions, setChecklistOptions] = useState([{label: "", value: ""}]);
  const [crud, setCrud] = useAtom(crudAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const service = useMemo(() => new PiecePendingService(), []);
  const { control, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: {
      id: "",
      piece_pending_items: [],
    },
    mode: "onSubmit",
    resolver: zodResolver(PiecePendingListSchema),
    reValidateMode: "onSubmit",
  });

  const piecePendingsForm = useForm({
    defaultValues: {
      actual_length: 0.0,
      actual_width: 0.0,
      adjustment_length: 0.0,
      adjustment_width: 0.0,
      description: "",
      estimated_delivery_date: new Date().toISOString(),
      note: "",
      quantity: 0,
      thickness: 0.0,
    },
    mode: "onSubmit",
    resolver: zodResolver(PiecePendingSchema),
    reValidateMode: "onSubmit",
  });

  function onClickAddPiecePending() {
    const piecePendings = piecePendingsForm.getValues();
    const piecePendingsList = control._formValues.piece_pending_items;
    piecePendingsList.push(piecePendings);
    setValue("piece_pending_items", piecePendingsList);
    piecePendingsForm.reset({
      actual_length: 0.0,
      actual_width: 0.0,
      adjustment_length: 0.0,
      adjustment_width: 0.0,
      description: "",
      estimated_delivery_date: new Date().toISOString(),
      note: "",
      quantity: 0,
      thickness: 0.0,
    });
  }

  function onClickRemovePiecePending(index: number) {
    const reports = getValues("piece_pending_items");
    setValue(
      "piece_pending_items",
      reports.filter((_, i) => i !== index)
    );
  }

  async function onLoadChecklists() {
    setIsLoading(true);
    await service.initialize();
    const records = await service.findChecklists();
    for (const record of records) {
      checklistOptions.push({
        label: record.project_code,
        value: record.id,
      });
    }
    setChecklists(records);
    setChecklistOptions(checklistOptions);
    setIsLoading(false);
  }

  function setOnAdd() {
    setCrud((previous) => ({
      ...previous,
      onAdd: async (formData) => {
        await service.initialize();
        return await service.editPiecePendings(formData.id, {
          piece_pending_items: formData.piece_pending_items,
        });
      },
    }));
  }

  function setOnEdit() {
    setCrud((previous) => ({
      ...previous,
      onEdit: async (targetValue, formData) => {
        await service.initialize();
        return await service.editPiecePendings(targetValue, {
          piece_pending_items: formData.piece_pending_items,
        });
      },
    }));
  }

  async function setPiecePendingsAndResetForm() {
    setIsLoading(true);
    await service.initialize();
    const items = await service.findPiecePendings({id: crud.formData.id}).piece_pending_items;
    console.log(items);
    reset({
      ...crud.formData,
      piece_pending_items: items,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    onLoadChecklists();
    setOnAdd();
    setOnEdit();
    if (crud.formData?.piece_pending_items?.length > 0) {
      setPiecePendingsAndResetForm();
    }
  }, [crud.formData]);

  return (
    <CrudFormComponent
      crudAtom={crudAtom}
      title={defaultLanguage.INFO.PIECE_PENDINGS}
      onClickSubmitButton={handleSubmit(async (formData) => {
        await crud.onSubmit(formData);
      })}
    >
      <PickerField
        control={control}
        disabled={crud.isEditing}
        label={defaultLanguage.INFO.CHECKLIST}
        path="id"
        options={checklistOptions}
      />
      <DynamicListField
        onClickAddButton={piecePendingsForm.handleSubmit((formData) => {
          onClickAddPiecePending();
        })}
        control={control}
        nodes={
          <View>
            <InputField
              control={piecePendingsForm.control}
              isNumber={true}
              label={defaultLanguage.INFO.QUANTITY}
              path="quantity"
            />
            <InputField
              control={piecePendingsForm.control}
              isNumber={true}
              label={defaultLanguage.INFO.ACTUAL_LENGTH}
              path="actual_length"
            />
            <InputField
              control={piecePendingsForm.control}
              isNumber={true}
              label={defaultLanguage.INFO.ACTUAL_WIDTH}
              path="actual_width"
            />
            <InputField
              control={piecePendingsForm.control}
              isNumber={true}
              label={defaultLanguage.INFO.ADJUSTMENT_LENGTH}
              path="adjustment_length"
            />
            <InputField
              control={piecePendingsForm.control}
              isNumber={true}
              label={defaultLanguage.INFO.ADJUSTMENT_WIDTH}
              path="adjustment_width"
            />
            <InputField
              control={piecePendingsForm.control}
              isNumber={true}
              label={defaultLanguage.INFO.THICKNESS}
              path="thickness"
            />
            <DateTimeField
              control={piecePendingsForm.control}
              label={defaultLanguage.INFO.ESTIMATED_DELIVERY_DATE}
              path="estimated_delivery_date"
            />
            <InputField
              control={piecePendingsForm.control}
              height={75}
              isMultiline={true}
              label={defaultLanguage.INFO.DESCRIPTION}
              path="description"
            />
            <InputField
              control={piecePendingsForm.control}
              height={75}
              isMultiline={true}
              label={defaultLanguage.INFO.NOTE}
              path="note"
            />
          </View>
        }
        label={defaultLanguage.INFO.PIECE_PENDINGS}
        path="piece_pending_items"
        onRenderItem={(item, index) => {
          item.estimated_delivery_date = new Date(
            item.estimated_delivery_date
          ).toLocaleString();
          return (
            <DetailCard
              buttons={
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 7,
                  }}
                >
                  <TouchableOpacity
                    style={[buttonStyle.button, buttonStyle.delete]}
                    onPress={() => onClickRemovePiecePending(index)}
                  >
                    <Ionicons name="trash" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              }
              item={item}
              itemKeys={[
                "quantity",
                "actual_length",
                "actual_width",
                "adjustment_length",
                "adjustment_width",
                "thickness",
                "estimated_delivery_date",
                "description",
                "note",
              ]}
              itemLabels={[
                defaultLanguage.INFO.QUANTITY,
                defaultLanguage.INFO.ACTUAL_LENGTH,
                defaultLanguage.INFO.ACTUAL_WIDTH,
                defaultLanguage.INFO.ADJUSTMENT_LENGTH,
                defaultLanguage.INFO.ADJUSTMENT_WIDTH,
                defaultLanguage.INFO.THICKNESS,
                defaultLanguage.INFO.ESTIMATED_DELIVERY_DATE,
                defaultLanguage.INFO.DESCRIPTION,
                defaultLanguage.INFO.NOTE,
              ]}
            />
          );
        }}
      />
    </CrudFormComponent>
  );
}
