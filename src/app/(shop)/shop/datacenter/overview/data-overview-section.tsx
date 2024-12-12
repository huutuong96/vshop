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
import { useEffect, useState } from "react";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useAppInfoSelector } from "@/redux/stores/profile.store";

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

export default function DataOverviewSection() {
  const [chartConfig, setChartConfig] = useState(initialChartConfig);
  const info = useAppInfoSelector(state => state.profile.info);

  useEffect(() => {
    const getData = async () => {
      try {
        const [configRes, dataChartRes] = await Promise.all([
          fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_analyst_chart_shop/${info.shop_id}?time=1&order_status=0`, {
            headers: {
              'Authorization': `Bearer ${clientAccessToken.value}`,

            }
          }),
          fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_analyst_shop/${info.shop_id}?time=1&order_status=0`, {
            headers: {
              'Authorization': `Bearer ${clientAccessToken.value}`,

            }
          })
        ])

      } catch (error) {

      }
    }
    if (info) {
      getData()
    }
  }, [])

  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <div className="w-full h-[44px] flex items-center">
          <div className="text-lg font-normal text-blue-800">Tổng quan</div>
        </div>
      </div>
      <div className="w-full bg-white mb-4 px-6 py-4 rounded-sm shadow-sm">
        <div className="flex gap-4 items-center">
          <Select value="1">
            <SelectTrigger className="w-auto">
              <div className="flex gap-4 px-2">
                Khung thời gian
                <SelectValue placeholder="Select a fruit" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Hôm nay</SelectItem>
                <SelectItem value="2">Trong 7 ngày qua</SelectItem>
                <SelectItem value="3">Trong 30 ngày qua</SelectItem>
                <SelectItem value="4">Trong 1 năm qua</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value="1">
            <SelectTrigger className="w-auto">
              <div className="flex gap-4 px-2">
                Loại đơn hàng
                <SelectValue placeholder="Select a fruit" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Đơn hàng đã đặt</SelectItem>
                <SelectItem value="2">Đơn hàng đã xác nhận</SelectItem>
                <SelectItem value="3">Đơn hàng đã thanh toán</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full bg-white mb-4 px-6 py-4 rounded-sm shadow-sm">
        <div className="mb-4">Tổng quan</div>
        <ScrollArea className="w-full h-[150px] whitespace-nowrap rounded-md">
          <div className="flex w-max">
            <div className="flex gap-3 w-max">
              {overviews.map((o, index) => (
                <div
                  key={index}
                  className="w-[calc(100%/5)] h-[125px] border rounded-sm px-4 py-3 shrink-0"
                >
                  <div className="h-9 mb-1">
                    <span className="text-sm">{o.label}</span>
                  </div>
                  <div className="mb-1">
                    <span className="text-xl">{o.value}</span>
                  </div>
                  <div className="text-[12px] text-gray-400">so với năm trước</div>
                </div>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="w-full">
          <div>Biểu đồ</div>
          {chartConfig && chartData && (
            <Card>
              <CardHeader>
                <CardTitle>Line Chart - Multiple</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent >
                <ChartContainer className="h-[300px] w-full" config={chartConfig}>
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

                    {chartConfig && Object.entries(chartConfig).map(([key, config]: [key: string, config: any]) => (
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

        </div>
      </div>
      <div className="w-full">
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
      </div>
    </div>
  )
}
