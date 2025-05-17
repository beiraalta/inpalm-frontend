import { buttonStyle } from "@/shared/components/buttons/styles";
import { cardStyle } from "@/shared/components/card/styles";
import { ChecklistSchema, TechnicalReportSchema } from "./custom_types";
import { ChecklistService } from "./service";
import { componentStyle } from "@/shared/components/styles";
import { crudAtom } from "./atom";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { defaultLanguage } from "@/shared/constants/languages";
import {
  DateTimeField,
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
import { fieldStyle } from "@/shared/components/fields/styles";

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
    setIsLoading(true);
    const report = technicalReportForm.getValues();
    const reports = control._formValues.technical_reports;
    reports.push(report);
    setValue("technical_reports", reports);
    technicalReportForm.reset({
      note: "",
      photo: "",
      started_at: "",
      finished_at: "",
    });
    setIsLoading(false);
  }

  function onClickRemoveTechnicalReport(index: number) {
    setIsLoading(true);
    const reports = getValues("technical_reports");
    setValue(
      "technical_reports",
      reports.filter((_, i) => i !== index)
    );
    setIsLoading(false);
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
        onClickAddButton={technicalReportForm.handleSubmit(async (formData) => {
          await onClickAddTechnicalReport();
        })}
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
            <DateTimeField
              control={technicalReportForm.control}
              label={defaultLanguage.INFO.STARTED_AT}
              path="started_at"
            />
            <DateTimeField
              control={technicalReportForm.control}
              label={defaultLanguage.INFO.FINISHED_AT}
              path="finished_at"
            />
          </View>
        }
        label={defaultLanguage.INFO.TECHNICAL_REPORTS}
        path="technical_reports"
        onRenderItem={(item, index) => {
          return (
            <View id={`technical-report-${index}`}>
              <View style={cardStyle.card}>
                <View style={{ marginBottom: 10 }}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 8,
                      height: 100,
                    }}
                  />
                </View>
                <View>
                  <Text style={fieldStyle.label}>
                    {defaultLanguage.INFO.NOTE}
                  </Text>
                  <Text style={{ textAlign: "justify" }}>{item.note}</Text>
                </View>
                <View style={componentStyle.inlineContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={fieldStyle.label}>
                      {defaultLanguage.INFO.STARTED_AT}
                    </Text>
                    <Text style={{ textAlign: "justify" }}>
                      {new Date(item.started_at).toLocaleString()}
                    </Text>
                  </View>
                </View>
                <View style={componentStyle.inlineContainer}>
                  <View style={{ flex: 1 }}>
                    <Text style={fieldStyle.label}>
                      {defaultLanguage.INFO.FINISHED_AT}
                    </Text>
                    <Text style={{ textAlign: "justify" }}>
                      {new Date(item.finished_at).toLocaleString()}
                    </Text>
                  </View>
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
