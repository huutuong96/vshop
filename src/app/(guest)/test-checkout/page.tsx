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
import TestCheckoutSection from "@/app/(guest)/_components/test-checkout-section";
import { notFound } from "next/navigation";
import { verifyToken } from "@/lib/jwt";

export const metadata: Metadata = {
  title: "Thanh toán",
};


const CheckoutPage = async ({ searchParams }: { searchParams: { code?: string } }) => {
  // const cookieStore = cookies();
  // const stateCheckout = cookieStore.get('stateCheckout')?.value;
  // const { code } = searchParams;

  // if (!code) {
  //   notFound(); // Gọi notFound() nếu không có code
  // }

  try {
    // const decode = await verifyToken(code);

    // if (!decode) {
    //   notFound(); // Gọi notFound() nếu token không hợp lệ
    // }


    return (
      <div className="w-content">
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
          {/* <CheckoutSection stateCheckout={stateCheckout} /> */}
          <TestCheckoutSection />
        </div>
      </div>
    );
  } catch (error) {
    return notFound(); // Gọi notFound() nếu có lỗi
  }


};

// const CheckoutPage = () => {
//   const cookieStore = cookies();
//   const stateCheckout = cookieStore.get('stateCheckout')?.value;


//   return (
//     <div className="w-content">
//       <div className="w-full text-[#888888]">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Thanh Toán</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//         <CheckoutSection stateCheckout={stateCheckout} />
//       </div>
//     </div>
//   );
// };

export default CheckoutPage;