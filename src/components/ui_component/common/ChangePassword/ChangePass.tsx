"use client";
import React from "react";
import { Modalbox } from "../modal/Modalbox";
import CForm from "../Form/CForm";
import CInput from "../Form/CInput";
import { FieldValues } from "react-hook-form";
import CButton from "../Form/CButton";
import { toast } from "sonner";
import { useUpdatePass } from "@/hooks/user.hook";

const ChangePass = () => {
  const { mutate, isPending } = useUpdatePass();
  const onFromSubmit = async (data: FieldValues) => {
    console.log(data);
    if (data.password !== data.cPassword) {
      toast.error("Password not matched.");
    } else {
      mutate(
        { password: data.password },
        {
          onSuccess: () => {
            toast.success("Password update successful.");
          },
          onError: () => {
            toast.error("Update Failed");
          },
        }
      );
    }
  };
  return (
    <div className="flex p-4">
      {" "}
      <Modalbox title="Change Password" btnText="Change Password">
        <CForm onFromSubmit={onFromSubmit}>
          <div className="grid gap-3">
            <CInput name="password" label="New Password"></CInput>
            <CInput name="cPassword" label="Confirm Password"></CInput>
            <CButton
              isPending={isPending}
              type="submit"
              text="Update"
            ></CButton>
          </div>
        </CForm>
      </Modalbox>{" "}
    </div>
  );
};

export default ChangePass;
