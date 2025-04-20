import { buttonStyle } from "@/shared/components/buttons/styles";
import { cardStyle } from "@/shared/components/card/styles";
import { ChecklistSchema, TechnicalReportSchema } from "./custom_types";
import { ChecklistService } from "./service";
import { componentStyle } from "@/shared/components/styles";
import { crudAtom } from "@/shared/components/crud";
import { CrudFormComponent } from "@/shared/components/crud/form";
import { defaultLanguage } from "@/shared/constants/languages";
import { DetailCard } from "@/shared/components/card";
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

export default function ChecklistFormComponent() {
  const [crud, setCrud] = useAtom(crudAtom);
  const service = useMemo(() => new ChecklistService(), []);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      assembly_team: "",
      customer: "",
      delivery_responsible_pnc: "",
      environments: "",
      inspected_by: "",
      piece_pending_items: [],
      piece_pending_notes: [],
      project_code: "",
      purchase_pending_items: [],
      purchase_pending_notes: [],
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
    technicalReportForm.reset({ note: "", photo: "" });
    reset({ ...control._formValues, technical_reports: reports });
  }

  function onClickRemoveTechnicalReport(index: number) {
    const reports = control._formValues.technical_reports;
    reports.splice(index, 1);
    reset({ ...control._formValues, technical_reports: reports });
  }

  function setOnAdd() {
    setCrud((previous) => ({
      ...previous,
      onAdd: async (formData) => {
        await service.initialize();
        return await service.addChecklist({
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
        return await service.editChecklist(targetValue, {
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
                      marginRight: 5,
                      width: 50,
                    }}
                  />
                  <Text style={{ textAlign: "justify" }}>{item.note}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 10,
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

              {/* <DetailCard
                buttons={
                  <View style={componentStyle.inlineContainer}>
                    <TouchableOpacity
                      style={[buttonStyle.button, buttonStyle.delete]}
                      onPress={() => onClickRemoveTechnicalReport(index)}
                    >
                      <Text style={buttonStyle.label}>
                        <Ionicons name="trash" size={20} color="#fff" />
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
                item={item}
                itemKeys={["note", "photo"]}
                itemLabels={[
                  defaultLanguage.INFO.NOTE,
                  defaultLanguage.INFO.PHOTO,
                ]}
                targetKey="note"
              /> */}
            </View>
          );
        }}
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
