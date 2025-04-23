import { buttonStyle } from "@/shared/components/buttons/styles";
import { cardStyle } from "@/shared/components/card/styles";
import { ChecklistSchema, TechnicalReportSchema } from "./custom_types";
import { ChecklistService } from "./service";
import { componentStyle } from "@/shared/components/styles";
import { crudAtom } from "./atom";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { defaultLanguage } from "@/shared/constants/languages";
import {
  DynamicListField,
  ImageField,
  InputField,
} from "@/shared/components/fields";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isLoadingAtom } from "@/shared/components/spinner";

export default function ChecklistFormComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const service = useMemo(() => new ChecklistService(), []);
  const { control, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: {
      assembly_team: "",
      customer: "",
      delivery_responsible_pnc: "",
      environments: "",
      inspected_by: "",
      piece_pending_items: [],
      piece_pending_notes: "",
      project_code: "",
      purchase_pending_items: [],
      purchase_pending_notes: "",
      technical_reports: [],
    },
    mode: "onSubmit",
    resolver: zodResolver(ChecklistSchema),
    reValidateMode: "onSubmit",
  });

  const technicalReportForm = useForm({
    defaultValues: {
      note: "",
      photo: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(TechnicalReportSchema),
    reValidateMode: "onSubmit",
  });

  function onClickAddTechnicalReport() {
    const report = technicalReportForm.getValues();
    const reports = control._formValues.technical_reports;
    reports.push(report);
    setValue("technical_reports", reports);
    technicalReportForm.reset({ note: "", photo: "" });
  }

  function onClickRemoveTechnicalReport(index: number) {
    const reports = getValues("technical_reports");
    setValue(
      "technical_reports",
      reports.filter((_, i) => i !== index)
    );
  }

  function setOnAdd() {
    setCrud((previous) => ({
      ...previous,
      onAdd: async (formData) => {
        await service.initialize();
        return await service.addChecklist({
          assembly_team: formData.assembly_team,
          customer: formData.customer,
          delivery_responsible_pnc: formData.delivery_responsible_pnc,
          environments: formData.environments,
          inspected_by: formData.inspected_by,
          piece_pending_items: formData.piece_pending_items,
          piece_pending_notes: formData.piece_pending_notes,
          project_code: formData.project_code,
          purchase_pending_items: formData.purchase_pending_items,
          purchase_pending_notes: formData.purchase_pending_notes,
          technical_reports: formData.technical_reports,
        });
      },
    }));
  }

  function setOnEdit() {
    setCrud((previous) => ({
      ...previous,
      onEdit: async (targetValue, formData) => {
        await service.initialize();
        return await service.editChecklist(targetValue, {
          assembly_team: formData.assembly_team,
          customer: formData.customer,
          delivery_responsible_pnc: formData.delivery_responsible_pnc,
          environments: formData.environments,
          inspected_by: formData.inspected_by,
          piece_pending_items: formData.piece_pending_items,
          piece_pending_notes: formData.piece_pending_notes,
          project_code: formData.project_code,
          purchase_pending_items: formData.purchase_pending_items,
          purchase_pending_notes: formData.purchase_pending_notes,
          technical_reports: formData.technical_reports,
        });
      },
    }));
  }

  async function setTechnicalReportsAndResetForm() {
    setIsLoading(true);
    await service.initialize();
    const reports = await service.findTechnicalReports(crud.formData.id);
    reset({
      ...crud.formData,
      technical_reports: reports,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    setOnAdd();
    setOnEdit();
    if (crud.formData?.technical_reports?.length > 0) {
      setTechnicalReportsAndResetForm();
    }
  }, [crud.formData]);

  return (
    <CrudFormComponent
      crudAtom={crudAtom}
      title={defaultLanguage.INFO.CHECKLIST}
      onClickSubmitButton={handleSubmit(async (formData) => {
        await crud.onSubmit(formData);
      })}
    >
      <InputField
        control={control}
        label={defaultLanguage.INFO.CUSTOMER}
        path="customer"
      />
      <InputField
        control={control}
        label={defaultLanguage.INFO.PROJECT_CODE}
        path="project_code"
      />
      <InputField
        control={control}
        label={defaultLanguage.INFO.ASSEMBLY_TEAM}
        path="assembly_team"
      />
      <InputField
        control={control}
        height={110}
        label={defaultLanguage.INFO.ENVIRONMENTS}
        isMultiline={true}
        path="environments"
      />

      <DynamicListField
        onClickAddButton={onClickAddTechnicalReport}
        control={control}
        nodes={
          <View>
            <ImageField
              control={technicalReportForm.control}
              label={defaultLanguage.INFO.PHOTO}
              path="photo"
            />
            <InputField
              control={technicalReportForm.control}
              height={75}
              isMultiline={true}
              label={defaultLanguage.INFO.NOTE}
              path="note"
            />
          </View>
        }
        label={defaultLanguage.INFO.TECHNICAL_REPORTS}
        path="technical_reports"
        onRenderItem={(item, index) => {
          return (
            <View>
              <View style={cardStyle.card}>
                <View style={componentStyle.inlineContainer}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 8,
                      height: 50,
                      marginRight: 15,
                      width: 50,
                    }}
                  />
                  <Text style={{ textAlign: "justify" }}>{item.note}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 7,
                  }}
                >
                  <TouchableOpacity
                    style={[buttonStyle.button, buttonStyle.delete]}
                    onPress={() => onClickRemoveTechnicalReport(index)}
                  >
                    <Text style={buttonStyle.label}>
                      <Ionicons name="trash" size={20} color="#fff" />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
      <InputField
        control={control}
        height={75}
        isMultiline={true}
        label={defaultLanguage.INFO.PIECE_PENDING_NOTES}
        path="piece_pending_notes"
      />
      <InputField
        control={control}
        height={75}
        isMultiline={true}
        label={defaultLanguage.INFO.PURCHASE_PENDING_NOTES}
        path="purchase_pending_notes"
      />
      <InputField
        control={control}
        label={defaultLanguage.INFO.DELIVERY_RESPONSIBLE_PNC}
        path="delivery_responsible_pnc"
      />
      <InputField
        control={control}
        label={defaultLanguage.INFO.INSPECTED_BY}
        path="inspected_by"
      />
    </CrudFormComponent>
  );
}
