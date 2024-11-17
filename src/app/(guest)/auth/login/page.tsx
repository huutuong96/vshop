import LoginForm from "@/app/(guest)/_components/login-form";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";



const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );

};

export default LoginPage;