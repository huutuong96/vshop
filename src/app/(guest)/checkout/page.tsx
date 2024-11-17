import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  MapPinIcon,
  MessageCircleMore,
  Ticket,
} from "lucide-react";
import CheckoutSection from "@/app/(guest)/_components/checkout-section";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanh toán",
};


const CheckoutPage = () => {
  const cookieStore = cookies();
  const stateCheckout = cookieStore.get('stateCheckout')?.value;


  return (
    <div className="w-full text-[#888888]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Thanh Toán</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <CheckoutSection stateCheckout={stateCheckout} />
    </div>
  );
};

export default CheckoutPage;