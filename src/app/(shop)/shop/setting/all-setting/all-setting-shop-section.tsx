'use client'
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { useEffect, useState } from "react";


export default function AllSettingShopSection() {
  const [shop, setShop] = useState<any>();
  const info = useAppInfoSelector(state => state.profile.info);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (shop) setLoading(false)
  }, [shop])


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/${info.shop_id}`, {
          headers: {
            'Authorization': `Bearer ${clientAccessToken.value}`
          }
        });
        if (!res.ok) {
          throw 'Error';
        }
        const payload = await res.json();
        setShop(payload.data.shop);
      } catch (error) {

      }
    }
    if (info) {
      getData()
    }
  }, []);

  const handleCheckedChange = async (c: boolean) => {
    try {
      setShop((prev: any) => ({ ...prev, status: c ? 2 : 1 }))
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/${info.shop_id}`, {
        headers: {
          'Authorization': `Bearer ${clientAccessToken.value}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ ...shop, status: c ? 2 : 3 })
      });
      if (!res.ok) {
        throw 'Error';
      }
      toast({
        title: 'success',
        variant: 'success'
      });
    } catch (error) {
      setShop((prev: any) => ({ ...prev, status: c ? 3 : 2 }))
      toast({
        title: 'Error',
        variant: 'destructive'
      })
    }
  }



  return (
    <div className="w-full">
      <div className="w-full my-4 text-xl font-medium">
        Chế độ Tạm Nghỉ
        {shop && shop.status === 3 && (
          <div className="w-full">
            Shop đang tạm nghỉ
          </div>
        )}

      </div>
      <div className="w-full p-4 px-6 bg-white border rounded-sm shadow-sm">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <div className="mb-1"> Chế độ Tạm nghỉ</div>
            <div className="text-gray-500">Kích hoạt Chế độ Tạm nghỉ để ngăn khách hàng đặt đơn hàng mới. Những đơn hàng đang tiến hành vẫn phải được xử lý.</div>
          </div>
          {loading && (
            <Skeleton className="h-10 w-20" />
          )}
          {!loading && (
            <Switch
              checked={shop.status === 2 ? true : false}
              onCheckedChange={handleCheckedChange}
              className="data-[state=checked]:bg-blue-800"
            />
          )}
        </div>
      </div>

    </div>
  )
}
