"use client";
import React, { ReactNode } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";

interface FormProps {
  children: ReactNode;
  onFromSubmit: (data: FieldValues) => Promise<void>;
}

const CForm = ({ children, onFromSubmit }: FormProps) => {
  const methods = useForm();
  const onSubmit = async (data: FieldValues) => {
    await onFromSubmit(data);

    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default CForm;
