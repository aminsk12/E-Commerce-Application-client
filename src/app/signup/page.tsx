"use client";
import CButton from "@/components/ui_component/common/Form/CButton";
import CForm from "@/components/ui_component/common/Form/CForm";
import CInput from "@/components/ui_component/common/Form/CInput";
import CSelect from "@/components/ui_component/common/Form/CSelect";
import { useUserRegistration } from "@/hooks/auth.hook";
import { IUserToken } from "@/interface/token.interface";
import { AuthContext } from "@/providers/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const SignupPage = () => {
  const router = useRouter();
  const { mutate, isPending } = useUserRegistration();
  const auth = useContext(AuthContext);
  const onFromSubmit = async (data: FieldValues) => {
    mutate(data, {
      onSuccess: async (data) => {
        const decode = (await jwtDecode(data?.data as string)) as IUserToken;
        toast.success("User has been created");
        if (decode?.role === "VENDOR") {
          auth?.setIsLoading(true);
          router.push(`/${(decode?.role as string).toLowerCase()}/manage-shop`);
        } else {
          router.push("/login");
        }
      },
      onError: (error) => {
        console.log(error);
        toast.success("Something Went Wrong");
      },
    });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center px-4">
      <div className="w-96 ">
        <CForm onFromSubmit={onFromSubmit}>
          <div className="grid gap-3">
            {" "}
            <CInput name="email" label="Email" type="email"></CInput>
            <CInput name="name" label="Name" type="text"></CInput>
            <CInput name="address" label="Address" type="text"></CInput>
            <CInput name="mobile" label="Mobile" type="number"></CInput>
            <CInput name="password" label="Password" type="password"></CInput>
            <CSelect
              text="Select Account Type"
              options={[
                { value: "CUSTOMER", label: "Customer" },
                { value: "VENDOR", label: "Seller" },
              ]}
              name="accountType"
              label="Open account as:"
            ></CSelect>
            <CButton
              isPending={isPending}
              text="Submit"
              type="submit"
            ></CButton>
          </div>
        </CForm>{" "}
        <div className="flex justify-end">
          <Link href={"/login"} className=" flex font-medium w-fit mt-2">
            {" "}
            <span className=" gap-2 ">Go to Login page </span>{" "}
            <span className="mt-1">
              {" "}
              <ArrowRight size={17} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
