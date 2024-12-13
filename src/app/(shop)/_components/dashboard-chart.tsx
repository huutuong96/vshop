"use client"

import { TrendingUp } from "lucide-react"
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
import { useEvent } from "@dnd-kit/utilities"
import { useCallback, useEffect, useState } from "react"
import envConfig from "@/config"
import { useAppInfoSelector } from "@/redux/stores/profile.store"
import { clientAccessToken } from "@/lib/http"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "blue",
  },
} satisfies ChartConfig



const fetchChartData = async (shopId: any, time: any, accessToken: any) => {
  const response = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_analyst_chart_shop/${shopId}?time=${time}`,
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

const fetchConfigData = async (shopId: any, time: any, accessToken: any) => {
  const response = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shop/get_analyst_shop/${shopId}?time=${time}`,
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

export default function DashboardChart() {
  const info = useAppInfoSelector(state => state.profile.info);
  const [time, setTime] = useState("3");
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartConfig1, setChartConfig1] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chartConfig2, setChartConfig2] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [chartDataRes, configRes] = await Promise.all([
        fetchChartData(info.shop_id, time, clientAccessToken.value),
        fetchConfigData(info.shop_id, time, clientAccessToken.value),
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
  }, [info, time, clientAccessToken]);

  useEffect(() => {
    if (info) {
      fetchData();
    }
  }, [info, fetchData]);


  return (
    <>
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
                <CardDescription className="flex gap-2 text-black"></CardDescription>
                <CardDescription className="flex gap-2 text-black"></CardDescription>
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

                {chartConfig2 && Object.entries(chartConfig2).filter((a, index) => index < 2).map(([key, config]: [key: string, config: any], index) => (
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
      <div className="my-4 w-full flex justify-center gap-4 bg-white">
        {chartConfig2 && Object.entries(chartConfig2).filter((a, index) => index < 2).map(([key, config]: [key: string, config: any], index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="size-2" style={{ backgroundColor: config.color }}></div>
            <div className="text-sm">{config.label}</div>
          </div>
        ))}
      </div>
    </>
  )
}
