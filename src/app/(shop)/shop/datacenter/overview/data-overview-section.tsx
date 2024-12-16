'use client'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCallback, useEffect, useState } from "react";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { formattedPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

// const chartData1 = [
//   { dateKey: "Tháng 1", revenue: 1, orders: 500, cancelledOrders: 50, visits: 10000 },
//   { dateKey: "Tháng 2", revenue: 1.2, orders: 600, cancelledOrders: 40, visits: 12000 },
//   { dateKey: "Tháng 3", revenue: 1.1, orders: 550, cancelledOrders: 30, visits: 11000 },
//   { dateKey: "Tháng 4", revenue: 0.9, orders: 450, cancelledOrders: 60, visits: 9000 },
//   { dateKey: "Tháng 5", revenue: 1.5, orders: 700, cancelledOrders: 20, visits: 15000 },
//   { dateKey: "Tháng 6", revenue: 1.3, orders: 650, cancelledOrders: 35, visits: 13000 },
// ];

// const chartConfig1 = {
//   revenue: {
//     label: "Doanh số",
//     color: "green",
//     dataKey: 'revenue'
//   },
//   orders: {
//     label: "Đơn hàng",
//     color: "blue",
//     dataKey: 'orders'
//   },
//   cancelledOrders: {
//     label: "Đơn đã hủy",
//     color: "red",
//     dataKey: 'cancelledOrders'
//   },
//     // visits: {
//     //   label: "Lượt truy cập",
//     //   color: "purple",
//     //   dataKey: 'visits'
//     // },
// };

const chartData = [
  { dateKey: "Tháng 1", revenue: 1000000, orders: 500, cancelledOrders: 50, visits: 10000 },
  { dateKey: "Tháng 2", revenue: 1200000, orders: 600, cancelledOrders: 40, visits: 12000 },
  { dateKey: "Tháng 3", revenue: 1100000, orders: 550, cancelledOrders: 30, visits: 11000 },
];

const initialChartConfig = {
  revenue: {
    label: "Doanh số",
    color: "green",
    dataKey: "revenue",
  },
  orders: {
    label: 'Tổng đơn hàng',
    color: 'red',
    dataKey: 'orders'
  }
};

const allMetrics = {
  revenue: { label: "Doanh số", color: "green", dataKey: "revenue" },
  orders: { label: "Đơn hàng", color: "blue", dataKey: "orders" },
  cancelledOrders: { label: "Đơn đã hủy", color: "red", dataKey: "cancelledOrders" },
  visits: { label: "Lượt truy cập", color: "purple", dataKey: "visits" },
};

const overviews: any[] = [
  {
    label: 'Doanh số',
    value: '1000000'
  },
  {
    label: 'Đơn hàng',
    value: '1000000'
  },
  {
    label: 'Đơn đã hủy',
    value: '1000000'
  },
  {
    label: 'Lượt truy cập',
    value: '1000000'
  },
  {
    label: 'Lượt xem trang',
    value: '1000000'
  },
  {
    label: 'Doanh số trên mỗi đơn hàng',
    value: '1000000'
  },
  {
    label: 'Doanh số đơn hủy',
    value: '1000000'
  },
  {
    label: 'Đơn đã hoàn trả / hoàn tiền',
    value: '1000000'
  },
  {
    label: 'Doanh số các đơn Trả hàng/Hoàn tiền ',
    value: '1000000'
  }
]

type InputData1 = Record<
  string,
  {
    labelEN: string;
    labelVN: string;
    value: number;
    isPrice: boolean;
  }
>;

type ChartConfig1 = Record<
  string,
  {
    label: string;
    color: string;
    dataKey: string;
  }
>;

const colors = ["green", "red", "blue", "purple"]; // Màu sắc tùy ý
const convertData = (data: InputData1): ChartConfig1 => {
  const keys = Object.keys(data);
  return keys.reduce((acc, key, index) => {
    acc[key] = {
      label: data[key].labelVN,
      color: colors[index % colors.length], // Lặp màu theo thứ tự
      dataKey: key,
    };
    return acc;
  }, {} as ChartConfig1);
};

type OrderStatus = { label: string; value: string; tagStatus: boolean };

const orderStatuses: OrderStatus[] = [
  {
    value: '&order_status=0',
    label: 'Chờ xác nhận',
    tagStatus: true
  },
  { value: '&order_status=1', label: 'Đã xác nhận', tagStatus: true },
  { value: '&order_status=2', label: 'Đang chuẩn bị hàng', tagStatus: true },
  { value: '&order_status=3', label: 'Đã đóng gói', tagStatus: true },
  { value: '&order_status=4', label: 'Đã bàn giao vận chuyển', tagStatus: true },
  { value: '&order_status=5', label: 'Đang vận chuyển', tagStatus: true },
  { value: '&order_status=6', label: 'Giao hàng thất bại', tagStatus: true },
  { value: '&order_status=7', label: 'Đã giao hàng', tagStatus: true },
  { value: '&order_status=8', label: 'Hoàn thành', tagStatus: true },
  { value: '&order_status=9', label: 'Hoàn trả', tagStatus: true },
  { value: '&order_status=10', label: 'Đã hủy', tagStatus: true },
  { value: '&status=1', label: 'Đã thanh toán', tagStatus: true }
];

const times = [
  { label: 'Hôm nay', value: '1' },
  { label: '7 Ngày trước', value: '2' },
  { label: '30 Ngày trước', value: '3' },
  { label: '1 Năm trước', value: '4' },
]

const fetchChartData = async (shopId: any, time: any, orderStatus: any, accessToken: any) => {
  const response = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_analyst_chart_shop/${shopId}?time=${time}${orderStatus}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    }
  );
  if (!response.ok) throw new Error("Failed to fetch chart data");
  return response.json();
};

const fetchConfigData = async (shopId: any, time: any, orderStatus: any, accessToken: any) => {
  const response = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_analyst_shop/${shopId}?time=${time}${orderStatus}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-cache",
    }
  );
  if (!response.ok) throw new Error("Failed to fetch config data");
  return response.json();
};

export default function DataOverviewSection() {
  // const [chartConfig, setChartConfig] = useState(initialChartConfig);
  const info = useAppInfoSelector(state => state.profile.info);
  // const [chartConfig1, setChartConfig1] = useState<any>();
  // const [chartData, setChartData] = useState<any[]>([]);
  const [time, setTime] = useState("1");
  const [orderStatus, setOrderStatus] = useState("&order_status=0");
  const [chartData, setChartData] = useState([]);
  const [chartConfig1, setChartConfig1] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chartConfig2, setChartConfig2] = useState<any>(null);


  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const [chartDataRes, configRes] = await Promise.all([
  //         fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_analyst_chart_shop/${info.shop_id}?time=1&order_status=0`, {
  //           headers: {
  //             'Authorization': `Bearer ${clientAccessToken.value}`,

  //           },
  //           cache: 'no-cache'
  //         }),
  //         fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_analyst_shop/${info.shop_id}?time=1&order_status=0`, {
  //           headers: {
  //             'Authorization': `Bearer ${clientAccessToken.value}`,

  //           },
  //           cache: 'no-cache'
  //         })
  //       ])
  //       if (!configRes.ok || !chartDataRes.ok) {
  //         throw 'Error';
  //       }
  //       const configPayload = await configRes.json();
  //       const chartDataPayload = await chartDataRes.json();
  //       setChartConfig1(configPayload.data);
  //       setChartData([...chartDataPayload.data]);
  //     } catch (error) {

  //     }
  //   }
  //   if (info) {
  //     getData()
  //   }
  // }, [])
  // Callback cho sự kiện thay đổi giá trị Select
  const handleTimeChange = useCallback((value: any) => setTime(value), []);
  const handleOrderStatusChange = useCallback((value: any) => setOrderStatus(value), []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [chartDataRes, configRes] = await Promise.all([
        fetchChartData(info.shop_id, time, orderStatus, clientAccessToken.value),
        fetchConfigData(info.shop_id, time, orderStatus, clientAccessToken.value),
      ]);
      setChartData(chartDataRes.data);
      let a = convertData(configRes.data)
      setChartConfig2(a);
      setChartConfig1(configRes.data);
    } catch (err) {
      toast({
        title: 'Error fetching data',
        variant: 'destructive'
      })
    } finally {
      setLoading(false);
    }
  }, [info, time, orderStatus, clientAccessToken]);

  useEffect(() => {
    if (info) {
      fetchData();
    }
  }, [info, fetchData]);

  if (typeof window !== 'undefined') {
    console.log({ chartData });
  }



  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <div className="w-full h-[44px] flex items-center">
          <div className="text-lg font-normal text-blue-800">Tổng quan</div>
        </div>
      </div>
      <div className="w-full bg-white mb-4 px-6 py-4 rounded-sm shadow-sm">
        <div className="flex gap-4 items-center">
          <Select value={time} onValueChange={(v) => setTime(v)}>
            <SelectTrigger className="w-auto">
              <div className="flex gap-4 px-2">
                Khung thời gian
                <SelectValue placeholder="Select a fruit" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {times.map(t => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={orderStatus} onValueChange={(v) => setOrderStatus(v)}>
            <SelectTrigger className="w-auto">
              <div className="flex gap-4 px-2">
                Loại đơn hàng
                <SelectValue placeholder="Select a fruit" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {orderStatuses.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full bg-white mb-4 px-6 py-4 rounded-sm shadow-sm">
        <div className="mb-4">Tổng quan</div>
        <div className="flex gap-4">
          {loading
            ? Array(4)
              .fill(null) // Giả định có 4 skeleton khi đang tải
              .map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-[125px] border rounded-sm px-4 py-3 shadow"
                >
                  <Skeleton className="h-9 mb-1 w-1/2" /> {/* Skeleton cho tiêu đề */}
                  <Skeleton className="h-6 mb-1 w-1/3" /> {/* Skeleton cho giá trị */}
                  <Skeleton className="h-4 w-1/4" /> {/* Skeleton cho text nhỏ */}
                </div>
              ))
            : chartConfig1 &&
            Object.entries(chartConfig1).filter((a, index) => index < 3).map(([key, config]: [key: string, config: any], index: number) => (
              <div
                key={index}
                className="flex-1 h-[125px] border rounded-sm px-4 py-3 shadow"
              >
                <div className="h-9 mb-1">
                  <span className="text-sm font-medium">{config.labelVN}</span>
                </div>
                <div className="mb-1">
                  <span className="text-xl font-medium">
                    {config.isPrice ? formattedPrice(+config.value) : config.value}
                  </span>
                </div>
                {/* <div className="text-[12px] text-gray-400">
                  so với năm trước
                </div> */}
              </div>
            ))}
        </div>
        <div className="w-full">
          <div className="my-4 mt-8 font-medium">Biểu đồ</div>
          {chartConfig2 && (
            <Card>
              <CardHeader>
                {loading && (
                  <>
                    <CardDescription>
                      <Skeleton className="h-5 w-10" />
                    </CardDescription>
                    <CardDescription>
                      <Skeleton className="h-5 w-24" />
                    </CardDescription>
                  </>
                )}
                {!loading && (
                  <>
                    <CardDescription className="flex gap-2 text-black"><span>Khung thời gian:</span> {times.find(t => t.value === time) ? times.find(t => t.value === time)?.label : ''}</CardDescription>
                    <CardDescription className="flex gap-2 text-black"><span>Loại đơn hàng:</span> {orderStatuses.find(t => t.value === orderStatus) ? orderStatuses.find(t => t.value === orderStatus)?.label : ''}</CardDescription>
                  </>
                )}
              </CardHeader>
              <CardContent >
                <ChartContainer className="h-[300px] w-full" config={chartConfig2}>
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="dateKey"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />

                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                    {chartConfig2 && Object.entries(chartConfig2).filter((a, index) => index < 3).map(([key, config]: [key: string, config: any]) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={config.dataKey}
                        stroke={config.color}
                        strokeWidth={2}
                        dot={false}
                        name={config.label} // Tooltip hiển thị
                      />
                    ))}
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}
          <div className="w-full flex gap-4 items-center my-6 justify-center">
            {chartConfig2 && Object.entries(chartConfig2).filter((a, index) => index < 3).map(([key, config]: [key: string, config: any], index) => (
              <div key={key} className="flex gap-1">
                <div className={`size-4 rounded-sm`} style={{
                  background: colors[index]
                }}></div>
                <div className="text-[12px]">{config.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="w-full">
        <div className="flex gap-4">
          <div className="w-2/3 bg-white mb-4 p-6 rounded-sm shadow-sm">
            <div className="text-xl">Thứ hạng sản phẩm</div>
            <div className="flex items-center justify-between pb-[1px] border-b">
              <div className="flex ">
                <div className="px-4 h-[56px] flex items-center text-blue-800 border-b-blue-800 border-b-2">Theo doanh số</div>
                <div className="px-4 h-[56px] flex items-center">Theo số sản phẩm</div>
                <div className="px-4 h-[56px] flex items-center">Theo lượt xem</div>
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full mt-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Thứ hạng</TableHead>
                    <TableHead>Thông tin sản phẩm</TableHead>
                    <TableHead className="text-right">Theo lượt xem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="w-1/3 bg-white mb-4 p-6 rounded-sm shadow-sm">
            <div className="text-xl">Thứ hạng ngành hàng</div>
            <div className="flex items-center justify-between pb-[1px] border-b">
              <div className="flex ">
                <div className="px-4 h-[56px] flex items-center text-blue-800 border-b-blue-800 border-b-2">Theo doanh số</div>
              </div>
            </div>
            <div className="w-full mt-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Thứ hạng</TableHead>
                    <TableHead>Ngành hàng</TableHead>
                    <TableHead className="text-right">Theo doanh số</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}
