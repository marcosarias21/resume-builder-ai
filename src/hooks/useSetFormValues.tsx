import { useDataStore } from "@/store/dataStore";
import { useEffect } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

export const useSetFormValues = <T extends FieldValues>(
  formKey: string,
  keyValue: string,
  setValue: UseFormSetValue<T>
) => {
  const { data }: any = useDataStore();

  useEffect(() => {
    if (data?.[formKey]) {
      Object.entries(data[formKey]).forEach(([key, value]) => {
        setValue(`${keyValue}.${key}` as any, data[formKey][key]);
      });
    }
  }, [data, formKey, keyValue, setValue]);
};

export const useSetFormValue = <T extends FieldValues>(
  keyData: string,
  setValue: UseFormSetValue<T>
) => {
  const { data }: any = useDataStore();
  console.log(data[keyData]);

  useEffect(() => {
    if (data?.[keyData]) {
      Object.keys(data[keyData]).forEach((key) =>
        setValue(key as any, data?.[keyData]?.[key as keyof any])
      );
    }
  }, [data, keyData]);
};
