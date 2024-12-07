'use client'

import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { formattedPrice } from "@/lib/utils";
import { MailPlus, Store, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import OrderSkeleton from "@/app/(guest)/account/orders/order-skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OrderDetailItem from "@/app/(guest)/account/orders/[id]/order-detail-item";


const titles: { id: number, title: string, order_status: number, valueString: any }[] = [
  { id: 1, title: "Chờ xác nhận", order_status: 0, valueString: (<div className="text-[#f3ff09] font-medium">Chờ xác nhận</div>) },
  { id: 2, title: "Đã xác nhận", order_status: 1, valueString: (<div className="text-blue-700 font-medium">Đã xác nhận</div>) },
  { id: 3, title: "Chờ giao hàng", order_status: 5, valueString: (<div className="text-[#16b9ae] font-medium flex gap-2"><Truck className="text-[#16b9ae]" size={20} strokeWidth={1.25} /> Đang vận chuyển</div>) },
  { id: 4, title: "Hoàn thành", order_status: 8, valueString: (<div className="text-green-500 font-medium">Hoàn thành</div>) },
  // { id: 5, title: "Trả hàng/Hoàn tiền", order_status: 9 },
  { id: 5, title: "Đã hủy", order_status: 10, valueString: (<div className="text-red-500 font-medium">Đã hủy</div>) }
]

// export default function OrdersGuestSection() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [orderStatus, setOrderStatus] = useState<number>(0);
//   const [page, setPage] = useState<number>(1);
//   const [pages, setPages] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const router = useRouter()



//   useEffect(() => {
//     // const controller = new AbortController(); // Khởi tạo AbortController
//     // const signal = controller.signal;
//     const getData = async () => {
//       try {
//         setLoading(true);
//         window.scrollTo({
//           top: 0,
//           behavior: 'smooth', // Thêm smooth để tạo hiệu ứng cuộn mượt
//         });
//         const ordersRes = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/order/user?order_status=${orderStatus}&page=${page}`, {
//           headers: {
//             "Authorization": `Bearer ${clientAccessToken.value}`
//           },
//           // signal,
//           cache: 'no-cache'
//         });

//         if (!ordersRes.ok) {
//           throw 'Error nè';
//         }
//         const ordersPayload = await ordersRes.json();
//         setOrders(prev => [...prev, ...ordersPayload.data.data]);
//         setPages([...ordersPayload.data.links]);

//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getData();
//     // return () => {
//     //   controller.abort();
//     // };
//   }, [orderStatus, page]);


//   return (
//     <div className="">
//       <div className='nav-menu w-full flex items-center bg-white rounded sticky top-[130px]'>
//         {
//           titles.map((item) => (
//             <div onClick={() => {
//               setOrderStatus(item.order_status);
//               setPage(1);
//             }} key={item.id} className={`h-full py-4 flex flex-1 items-center justify-center text-sm font-semibold cursor-pointer border-b-2 hover:text-blue-700 ${item.order_status === orderStatus ? 'border-blue-600 text-blue-700' : ''}`}>{item.title}</div>
//           ))
//         }
//       </div>
//       <div>
//         {loading && (
//           <>
//             <OrderSkeleton key={1} />
//             <OrderSkeleton key={2} />
//           </>
//         )}
//         {!loading &&
//           (orders.length > 0 ? orders.map((o: any, index: number) => (
//             <OrderDetailItem setOrderStatus={setOrderStatus} key={o.id} o={o} />
//           )) : (
//             <div key={'abxfsdaf'} className="w-full bg-white mt-4 rounded h-[540px] flex items-center">
//               <div className="w-full flex flex-col items-center">
//                 <img className="size-[100px]" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/return/5fafbb923393b712b964.png" alt="" />
//                 <div className="mt-2">Bạn không có đơn hàng nào {titles.find(t => t.order_status === orderStatus)?.title ?? ''}</div>
//               </div>
//             </div>
//           ))}

//       </div>
//       {/* <div className="w-full mt-6 flex justify-end">
//         {orders.length > 0 && (
//           <Pagination className="justify-end">
//             <PaginationContent>
//               {pages[0].url && (
//                 <PaginationItem key={'back'}>
//                   <PaginationPrevious content="Back" onClick={() => {
//                     setPage(page - 1);
//                   }} />
//                 </PaginationItem>
//               )}


//               {pages.filter((l: any) => {
//                 return typeof +l.label === 'number' && !isNaN(+l.label)
//               }).map((p, index) => (
//                 <PaginationItem key={p.label}>
//                   <PaginationLink onClick={() => {
//                     setPage(+p.label)
//                   }} isActive={+p.label === page} className="cursor-pointer">{index + 1}</PaginationLink>
//                 </PaginationItem>
//               ))}
//               {pages[pages.length - 1].url && (
//                 <PaginationItem key={'next'}>
//                   <PaginationNext onClick={() => {
//                     setPage(page + 1)
//                   }} />
//                 </PaginationItem>
//               )}

//             </PaginationContent>
//           </Pagination>
//         )}
//       </div> */}
//     </div>
//   )
// }
export default function OrdersGuestSection() {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderStatus, setOrderStatus] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // Kiểm tra có thêm dữ liệu không
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchOrders = async (currentPage: number) => {
    try {
      setLoading(true);
      const ordersRes = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/order/user?order_status=${orderStatus}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${clientAccessToken.value}`,
          },
          cache: "no-cache",
        }
      );

      if (!ordersRes.ok) throw new Error("Failed to fetch orders");

      const ordersPayload = await ordersRes.json();
      const newOrders = ordersPayload.data.data;

      // Cập nhật danh sách orders
      setOrders((prev) => [...prev, ...newOrders]);

      // Kiểm tra nếu không còn dữ liệu
      if (newOrders.length === 0 || currentPage >= ordersPayload.data.last_page) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset khi đổi trạng thái đơn hàng
    setOrders([]);
    setHasMore(true);
    setPage(1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Thêm smooth để tạo hiệu ứng cuộn mượt
    });
    fetchOrders(1);
  }, [orderStatus]);


  useEffect(() => {
    if (page > 1) {
      fetchOrders(page);
    }
  }, [page]);

  const handleScroll = () => {
    const itemHeight = 150; // Chiều cao trung bình của một item (đơn vị: px)
    const buffer = itemHeight * 3; // Khoảng cách tương ứng với 3 item

    // Kiểm tra nếu còn buffer từ cuối trang
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - buffer &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1); // Tăng số trang
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="">
      {loading && (
        <div className="nav-menu w-full flex items-center bg-white rounded sticky top-[130px]">
          {titles.map((item) => (
            <div
              key={item.id}
              className={`h-full py-4 flex flex-1 items-center justify-center text-sm font-semibold cursor-pointer border-b-2 ${item.order_status === orderStatus
                ? "border-blue-600 text-blue-700"
                : ""
                }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
      {!loading && (
        <div className="nav-menu w-full flex items-center bg-white rounded sticky top-[130px]">
          {titles.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setOrderStatus(item.order_status);
              }}
              className={`h-full py-4 flex flex-1 items-center justify-center text-sm font-semibold cursor-pointer border-b-2 hover:text-blue-700 ${item.order_status === orderStatus
                ? "border-blue-600 text-blue-700"
                : ""
                }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}

      <div>
        {orders.map((o: any) => (
          <OrderDetailItem key={o.id} setOrderStatus={setOrderStatus} o={o} />
        ))}
        {loading && (
          <>
            <OrderSkeleton key={1} />
            <OrderSkeleton key={2} />
          </>
        )}
        {!loading && orders.length === 0 && (
          <div className="w-full bg-white mt-4 rounded h-[540px] flex items-center">
            <div className="w-full flex flex-col items-center">
              <img
                className="size-[100px]"
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/return/5fafbb923393b712b964.png"
                alt=""
              />
              <div className="mt-2">
                Bạn không có đơn hàng nào{" "}
                {titles.find((t) => t.order_status === orderStatus)?.title ?? ""}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
