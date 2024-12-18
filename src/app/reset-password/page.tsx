"use client";

import CButton from "@/components/ui_component/common/Form/CButton";
import CForm from "@/components/ui_component/common/Form/CForm";
import CInput from "@/components/ui_component/common/Form/CInput";
import { useSetNewPass } from "@/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react"; // Import Suspense
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ResetPassword = () => {
  const searchParams = useSearchParams(); // Access query params
  const router = useRouter();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { mutate: changePassword } = useSetNewPass();

  const onFormSubmit = async (data: FieldValues) => {
    if (data.password !== data.cPassword) {
      toast.error("Password not matched.");
    } else {
      changePassword(
        { token: token as string, password: data.password },
        {
          onSuccess: () => {
            toast.success("Password reset successful.");
          },
          onError: (error) => {
            throw new Error(error.message);
          },
        }
      );
    }
  };

  if (!token || !email) {
    router.push("/");
    return null; // Prevent rendering if token or email is not present
  }
  return (
    <div>
      <div className="container mx-auto">
        <div className="h-10 bg-black font-semibold text-white text-2xl flex items-center justify-center mb-10">
          <p>Reset Password</p>
        </div>
        <div className="flex justify-center ">
          <div className="w-96">
            <CForm onFromSubmit={onFormSubmit}>
              <div className="grid gap-4">
                <CInput
                  required={true}
                  label="Password"
                  type="password"
                  name="password"
                />
                <CInput
                  required={true}
                  type="password"
                  label="Confirm Password"
                  name="cPassword"
                />
                <CButton type="submit" text="Change Password" />
              </div>
            </CForm>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the component with Suspense
const WrappedResetPassword = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPassword />
  </Suspense>
);

export default WrappedResetPassword;
