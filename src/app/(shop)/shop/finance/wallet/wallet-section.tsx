'use client'
import WithdrawalHistoryTable from "@/app/(shop)/shop/finance/wallet/withdrawal-history-table";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { formattedPrice } from "@/lib/utils";
import { useAppInfoSelector } from "@/redux/stores/profile.store";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";


interface WithdrawalRecord {
  id: string;
  date: string;
  amount: number;
  status: string;
}

const data: WithdrawalRecord[] = [
  { id: '1', date: '2024-12-01', amount: 1000, status: 'Completed' },
  { id: '2', date: '2024-11-25', amount: 1500, status: 'Pending' },
  { id: '3', date: '2024-11-18', amount: 2000, status: 'Completed' },
  { id: '4', date: '2024-11-10', amount: 500, status: 'Failed' },
];

const handleChangeSearchParams = (page: number, limit: number) => {
  return `${page ? `&page=${page}` : ''}${limit ? `&limit=${limit}` : ''}`
}

export default function WalletSection() {
  const [wallet, setWallet] = useState<any>();
  const [historyDraws, setHistoryDraws] = useState<any[]>([])
  const shopInfo = useAppInfoSelector(state => state.profile.info);
  const [pages, setPages] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (shopInfo.shop_id) {
      const getData = async () => {
        try {
          const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/wallet/${shopInfo.shop_id}?${handleChangeSearchParams(page, limit)}`, {
            headers: {
              'Authorization': `Bearer ${clientAccessToken.value}`
            }
          });
          const payload = await res.json();

          setWallet(payload.data.shop);
          setHistoryDraws([...payload.data.history.data]);
          setPages([...payload.data.history.links]);
        } catch (error) {
        }
      }
      getData()
    }

  }, [handleChangeSearchParams(page, limit)])
  const handleWallet = async () => {
    try {
      const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/shop_request_get_cash/${shopInfo.shop_id}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${clientAccessToken.value}`
        }
      })
      if (!res.ok) {
        throw 'Error'
      }
      toast({
        variant: 'success',
        title: 'success'
      });
      router.push('/shop/finance/income')
    } catch (error) {
      toast({})
    }
  }

  return (
    <>
      <div className="w-full p-4 bg-white border rounded-sm mb-6">
        <div className="w-full">
          <div className="text-2xl font-semibold">Tổng Quan</div>
          <div className="mt-4 w-full">
            <div className="w-full border rounded-sm p-5 flex items-center gap-2 justify-between">
              <div className="">
                <div className="w-full flex gap-2 items-center">
                  <div className="text-xl font-semibold">Số dư:</div>
                  <div className="text-3xl font-semibold">{wallet?.wallet && formattedPrice(wallet.wallet)}</div>
                </div>
                <div className="mt-2">
                  {loading && (
                    <Button disabled className="bg-red-500 text-white flex">
                      <img className="size-4 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" />
                      Yêu cầu thanh toán
                    </Button>

                  )}
                  {!loading && (
                    <Button disabled={!wallet || wallet.wallet === 0} onClick={() => handleWallet()} className="bg-red-500 text-white">Yêu cầu thanh toán</Button>
                  )}
                </div>
              </div>
              <div className="pr-4">
                <div className="text-xl mb-4 font-semibold">Tài khoản ngân hàng</div>
                <div className="flex">
                  <div className="mr-2">
                    <img className="size-10" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDQ8PEA8VDw8OEA8QDw8XDxAWEQ8OFxYWFhURExYYHTQgGBolGxMTLTEiJSkrLi46IyA1ODMtNygtLisBCgoKDg0OGhAQGi0lHyUrLS4tKy0rLS0tLS0tLS0tLS4tLS0tLS0tLSstLSsvKy0tKy0tLS0tLS0tLS0tKy0tLf/AABEIAN0A5AMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAwIHBAUGAQj/xABFEAACAgACBwQGBgcHBAMAAAABAgADBBEFBhIhMUFRB2FxgRMiMlKRoRQjQnKxwSRigpKy0fBDU4OTorPCRGNz0hUzVP/EABoBAQEBAQEBAQAAAAAAAAAAAAACAQMFBAb/xAAyEQEBAAIBAwIDBAoDAQAAAAAAAQIDEQQSMSFBE1FhBTKBkRQiQlJxobHR4fAVI8FD/9oADAMBAAIRAxEAPwC8YBAIBAIBA8JgYOI0xhq/auXPoDtH4LPnz6vTh5yn9f6IueM92m0nrzg8Ou021lyJAGZ6AcT5CcseuxzvGvG1zy6jHFx2ke2E5kYfCDueyw5eOyo/MT6Mcs75kn8/7Ply6792NBiu0/Stns2V0/cpU/7m1K5rhl1u2+PRrrtdNKWe1jrf2SE/gAmc1xy6rbf2mG+nMa3tYy9vHEWn85Lld2z96/mW2Mtb2rXbxsY/iZlTc8r5teAk8d8lJiyaH1sRwJHnJqpWZTjbl9m6xfCxx+Bk810meXzv5s+jTWMXhirh/j2H8TJ78p7uuO3OftX82wo1p0gvDFP5hG/iEz42c93Wb9n7zZYfXbHrxdLPvVL/AMco/Sdkdcep2Nnh9frvt0I33WZfxzmzrcp5jrOqy942uG14ob26nQ92yw/EH5TpOuw95XSdTjfMbbC6w4S32b1B6Nmh/wBXGdseq1ZeMv8Ax1m3C+7ZqwIzBzB4HlO7o9gEAgEAgEAgeEwNVjdYcPVmA3pGHJd4824T4tvX6dfpzzfo55bcY0WL1ovbdWFqHX2m+J3fKeds+0tuX3Zx/P8A38nK7rfDUYnF2Wf/AGWM/ixI8hwE+LPbns+9bXO23y1el9ILhqHtbfs7lX3nPBf675ejTducxjnll2zlWmOxtl9hssbaY8Oij3VHIT9Fr1468e3GPiyyuV5pQludTExKYmJpizGGLMoaskNWTQ5ZNackirh6SKuHpIq4ek51cPSc6uHpIqock51UZ2DxVlRzrsZPBiAfEcDMx2ZYfdvC8crPDotH612rkLVFg94ZK/8AI/KfXr+0s8fTOc/1/t/R3x3X3dJo7StOIzFb+sBmUO5wOuXMd43T1tO/DbOcK7Y5zLwzZ1WIBAIGn0rrBVTmq/W2DkD6qn9Y/kJ8PUdfhq9J61zy2SOU0hpW6/239X3BuQeXPznjbup2bfvX0+Xs+fLO5eWFOCRAixmyMcrr6x9BSOXpd/jsnL856f2bP18v4OG7w4oT13ypiE1MTEpiYmmLMYYsyhqyQ1ZNDlk1pySKuHpIq4ekirh6TnVw9Jzq4ekiqhyTnVMhJzqjknOqesDuKsUdTmjqcmRveU/0DwO4ytW3LXl3YlnLr9UtY/pW3RdkuLw4G2BuW2s+zcg6HmOR8p+l0bptwmUfRp3d/ON8z/eXRzs7vGIAJJyA3k8gIt4HIac1hawmukla+Bfgz+HQfjPD6vr7n+pr8fP5/wCHzZ7efSOfnmOQmggRJmxhbGVGNBrlTt4Mn+7dH8vZP8U+7oMu3bx845bZzi4MT2nyJiE1MTEpiYmmLMYYsyhqyQ1ZNDlk1pySKuHpIq4ekirh6TnVw9Jzq4ekiqhyTnVMhJzqjknOqTmNajS+NfBYjC46v2qn2HH95URmUPltfHunp/Zuyy3H8Xz7cvh5Y7IuLC4hLa0tQ7SWIro3VWGYPwM9t6sss5jntbtIkAYdT7Q2rD+ryXz/AJdZ5P2l1HH/AFY/j/Zx3ZezlZ47gIBA8JhhbGXGFsZUjGNi6hZW9Z4OrKfMZTpryuOUynsy+sVk9ZRmVtzKSpHeDkZ+hllnMfFfR6JqKmJiUxMTTFmMMWZQ1ZIasmhyya05JFXD0kVcPSRVw9Jzq4ek51cPSRVQ5Jzqj0nOqh6TnVJzGtDrmf0Ve+1f4Wn3fZ0/7b/D+z5uq+5+Lu+yrSPpdE1qzb8PZZTmegydR5K4HlPex8Ps6LPu1T6ejV6Sv9Jfa/vO2X3RuHyAn5jfn37csvqnK821jTkwQPCYEGMqRJbGVGFsZcjC2MqRjita8JsX+kHs3DP9sbj+R+M9fo9ndh2/J822evLTCfW41MTEpiYmmLMYYsyhqyQ1ZNDlk1pySKuHpIq4ekirh6TnVw9Jzq4ekiqhyTnVHpOdVD0nOqTmNctrxfupr6lnPlkB+LT1Ps3D72X4Pj6u+kg1R0u1GHdBnkbWbd91B17p609G9Ns7cOPq6kiflX1iB4YEGMqRhbGVGFsZUjC2MuRJbGVGNbpvB+moZR7S+sn3hy8xmJ9HT7OzOVGc5jhxPYfJUxMSmJiaYsxhizKGrJDVkhyya05JFXD0kVcPSRVw9Jzq4ek51cPSRVQ5Jzqoek51UPSc6pOY1Xus+L9Li7Mt615Vr+zx+e1Pf6PX2ap9fV5m/Luzrp9QdAnFYSyzLPZvZOXJKz/yn1ycvs6TX3Yc/V0mkqtjEWr0sfLwzOXyyn5rfj27cp9a+jKcWsacmIMZUYWxlRhbGVIwtjKkYWxlRJbGXGFkyoxyGn8H6O7aA9SzNh3N9oT1Om2d2HF8x8+ycVrhO7imJiaYsxhizKGrJDVkhyya05JFXD0kVcPSRVw9Jzq4ek51cOSRVQ9Jzqoek51UPSc6pjaWxnoMPZZzUZL3udy/OdNGr4myYp2ZduNqtGOfHf1PWfpHlL37KMJ6PQ9LEZG57rT+8VB/dRZePh7nR48aoTrbRsYotytVW8x6p/ATwvtHX27ufnP8G2cZNGxnwyORbGVGFsZcjC2MqRhbGVGFsZUSWTKjC2MqMYWk8MLqmTnxU9GHCdtWfZlyjKcxytOFtdiqVu7A5FVRmIPTIT0+XzzDK+I2mF1X0jZ7OBv8TRYo+LACaqdPtvjGtpR2faWb/pCo6tbSPltZzOKudFuvs2FPZlpM8RUnjd/6qY7KudBt+jLr7LMfztw4/wAS4n/bmfDrf+P2/Ofz/sy6+yvFc8TUPBbDHwqufZ2f70OHZbf/APrr/wAp/wCcz4N+bf8Ajsv3p+X+Ux2Y3j/qq/8ALf8AnJ+Bfm2fZ+X738gezfFDhfUfH0g/Iyb0+Xzb+g5/OIHs/wAcPtUt4WWfmk53ps/ofoez6f7+Bb6mY9f7IN4Wp+ZE55dNs+R+jbJ7Ma3QWMr9rDWeSFh8VznHLTsnnGs+FnPMY+yVOTAqehBB+Bnz5Tjyw1Jzqoek51UPSc6qOR12x+06UA7k9d/vkbh5D8Z632dq4xuy+/h8fU583tcuZ6b5ZH05oTBfR8Jh6P7mmus95VQCfjnLj9Hhj24yNZrlhtqhbRxqbf8Adbd+OzPP+0tfdrmfy/8Af9jnunpy4ljPFj5S2MqRhbGXIwtjKjC2MqRiBMqJLYymFsZUYWxlRLv+zvTe0hwbn1kBak+9XzTxBPw8J9/TbOZ2193S7eZ2X8HbT632CAQCAQCAQCAQCAQF3UI4ydFcdGUEfAzLjL6WMsl8tPjdVcJZvVDS3VDkP3Tuny7Oi1ZeJx/Bzy041y2ltBW4X1j69ZOQsA4HkGHL8J5XUdLnq9fM+b589dxavFYlaantbgik+J5AeJynzYa7szmM93PLKYzmqzxN7WOzsc2dix8TP0eGMxxmM9nmW23mtvqPgPpOlcHVlmPSixumxXnYQfHZy85Tv02HdtkfR06PdJxdAtretuDqVPdnzkbMJnjcb7ss5nCr70KMyMMmQlWHeDkZ+auNxtl8vgvoQxmyJLYy4wtjKkYWxlRhbGUlBjKjC2MqJLYyox7hsU9NiW1nZetgynvHXqO6XjbLzGTK43mLm0DpZMZhkuTdnudeaWD2lP8AXDKelhnMpy9jVsmzHujYy3QQCAQCAQCAQCAQCAQFYqhbK3rYZq6lT585OeEzxuN92WczhQeuekN64ZT7PrW/e+yv5/CeX0GnjnZf4R4vUZ/sxyxnpPmWV2JaN2sRicURuqrWlDy2nO02XeAg+M3Hy9HoMPW5LglvTEDhNdsF6O8WgercN/dYu4/EZfOeN1+rt2d09/6vk348XlzTGfHHzlsZUjCyZTC2MpJbGVGFsZUYgxlRJbGVElsZTG81N1hOCxPrn9HuyW0e70sHhz7s+6d9Wfbfo7dPu+Hl6+KuJWBAIOYIzBHAjqJ9z2HsAgEAgEAgEAgEAgEDV6y6YTA4O7Ev/Zqdhc/btO5EHicvmZl8Oe3ZMMLlXzZfczuzsc2clmPUmcscZjJI/P283mlkyhf3Zboz6PoigkZPidrEN3h/Y/0BJePh7nS4duqOtmvoEDW6w6P+kYZ0A9cevX98cB57x5zh1Gr4muz39nPZj3Y8KtYzw5HnlsZUYgxlRhbGVElsZUYWxlRJbGVGFsZSS2MpJbGVGLE7NtZswMDc28D9GY81HGo945d27kJ9OnP9mvQ6PqP/AJ5fh/ZYc+h6IgEAgEAgEAgEAgECj+1fWb6Xi/otbZ4fCMQcuFmI3hm8F4D9rrIt5eR1u7vy7J4n9XCEzHxMvQ2j2xWKowy8b7UTP3VJ9ZvIZnyh11Yd+UxfTtVaoqooyVAFUcgoGQE6PfnonAIBArjXXRnoMT6RR9Xfmw6Cz7Q/PzPSeR1ersz5nivh34duXPzc2xnzx86DGVElkyowtjKiS2MqRhbGUktjNYWxlRJbGUmorYVYMpKspDKwORVhvBB5HOVGcrn1H1mXH0ZOQMTSALV4bQ5WqOh59D5T68M+6Pa6XqPi4+vmeXSy31CAQCAQCAQCAQOQ7StZ/oGDKVtlicSGSrLjWv2rfLPd3kdDJyr5uq3fDw9PNUGZLxESYasXsV0R6TGW4th6uGTYQ/8Aes3ZjwQN+8JU8vQ6HXzlcvkuiU9MQCAQNdp7RgxWGeo7m9qtvdsHA/l5mct2ubMLijZh348KkuUqzKw2WUlWU8QwORB854/HF4ry76EsZsSWxlRiDGVElsZUYWxlJpbGVElsZTC2M1KBMpjI0VpO3CXpfS2T1n9ll5ow5gysbxeW69mWvKZYr11e03VjsMt9Ryz3OhPrV2Dijfz57jPqxy5nL39O3Hbj3Rs5rqIBAIBAIBAxtI46vDUWX2tsV1KWdu4ch1J5DnCcspjOa+ctZ9OWaQxdmJs3bXq1pyrqGeyg+O/vJnN4W7bdmfdWpJhzRJmtfQ/Zxob6HouhGGVtw9Pbu37b5EA94UIPKVPD2+n19muR0813EAgEAgcB2haH2WGLQeq+S3Do/BX8+Hw6z4Oq1cXvn4vi6rXx+vHEsZ8kfEWxlRJbGVGFsZSS2MqMLYzUoMZSSyZTEGM1iBM1jb6q6xW6PxItT1q2yW+rPdYnd0YZnI/kTLxvDv0++6suZ49166M0hViaUvpcPXYM1P4gjkQeIneXl72Gczx7sfDKmqEAgEAgEClO1bW36Vd9CobPD4dvrGB3XXj8VXf4nPoDIt5eV1m/uvZj4V8TMfCiZrW+1F0L9O0lRQRnWrelu6ehTIkHuJ2V84fR0+vvzkfSEt7QgEAgEAgKxeGS2t6nG0lilWHcfzmZSZTisykynFU1pzRr4TEPS+/Z3o3v1n2W/rnnPLzwuGXFeRswuGXbWtYzI5FkymFsZsSWxlJLYyk1AmawtjKYgTNYiTNECZo6LUrWyzR12/N8NaR6aroeHpE/WA+PDoReOXD6em6i6cvpfK8sFi676kuqcWV2DaRxwI/rlOz3McplOYfChAIBAr7tR1y+i1nBYdv0m1frHB30VHv5Ow4dBv6SbXxdX1HZO2eVKSXkoma14TDV0di2g/RYOzGOMnxTbNfUUIcs/Ntr4LNj1ej19uHdfdY8p9ggEAgEAgEDndddA/TMPtIPr6c2r6uv2q/Pl3+c47tffPTy+fqNXfj6eYqJjPgeSWxlJLYyoktjKZSyZqUCZrECZTECZogTNESZogTNHRam64XaNty32YZz9bTnz9+vo3yPPkRUvD6en6nLVfp8l46I0rRjKVvosFlbfFW5qw4gjoZ0l5e3hnjnOcazZqxA5HX7XSvRtXo6yHxli/V18RWp/tbO7oOfhmRNvD5uo6iap9VDYrEPbY9ljF7LGLO5OZZjxJkvGuVyvNJJmiJhrN0Hox8Zi6MLX7V9gTP3V4s/koY+UOmvDvymL6cwWFSmqumsbNdSLWi9EUAAfAS3uScTiHQ0QCAQCAQCAQKz7RtXfROcZUv1dh+vUfYsPB/Bjx7/ABnybtfF7o83q9Pbe+ePdwjGcY+BBjNTS2MpJZM1iBMpiBM0RJmiBM0RJmiBM0RJgZ+g9OYnA2+lw9hRjkGXilij7LrzHHvHIib4ddW3PXecas/Q3azhXUDFVPRZzZBt1nv94eGR8Zfd83qa+vwv3vRhay9rC7BrwFZ2yCPpFigBO9E+0fvZeBi5fJG3rp4w/NVeKxD22NZY5sssJZ3Y5szdSZLzssrleaSZrETCnhgW12J6AyW3SDje2dGHz90EekceJAHk3WbHp9Fr4nfVrSn3CAQCAQCAQCAQF30rYjVuoZHUqyngyncQYs5ZZLOKpXW/V98BiNne1FmbUWdV5o36wz89x8Pizw7a8TqNN1Zce3s59jMfMgTNYgTNYgTKECZoiTNECYECZQiTAiTNETDUTNa8MNRMNeGa1Ew1l6G0bZjMVThqvbucKDyUcWc9wAJ8odNeFzymMfTei8BXhsPVh6hlXSioo55AcT1J5y3uY4zGcRlQ0QCAQCAQCAQCAQNfpzRFWNw70Wjc29WHtVuODr3j57xzk5YzKcVz26sdmPbVGab0Xbg8Q9FwyZd4YezYh4OvcflvHKfLcbLxXg7deWvK45NcTDkgTNESZogTNESZogTNECZoiTNETDXhM1qMNeEw1EzWokw14YauLsX1b9HU+kbV9e8GvDg/ZpB9Z/2iPgO+bHp9Jq4nfVnyn2iAQCAQCAQCAQCAQCBotbtW69IYfYOSXJmabcvZb3T1U5DMefKTlj3Rw6jRNuPHv7VRukMHZh7nptQpZWcmU/IjqDyM+fjh4OeNxyuOXlikwlAmaIkzRAmaIkzREmaIkw1Ema1GGvCYaiZrUSYa8MNbvUzV9tI46vDjMV+3e4+xSPa8zuA7zDvo1fEy4fSWHpWtErRQqVqqIo4KoGQA7shLexJx6QyGiAQCAQCAQCAQCAQCAQOY121STSNW0uSYqsH0VnJhx9G/6vfy+IMZY8vl6nppunM8xSGMw1lNj1Woa7K2Kuh4qf6585xeHljcbxfLHJmsRJmiBM0RJmiJhqJmteGGokw1EzWvCYaiYaiTDX0H2Z6r/wDx+BDWLlicTs2XdUH2KvIE595MqR7HT6vh4/V2E13EAgEAgEAgEAgEAgEAgEAgcvrtqfXpGvaXKvFVjKu3kw/u7MuK9/EfEGcseXy9T003TmeVIaSwNuGuem5DXahyZT8iDzB5EcZy4eJnhlhe3KerDJmpRJmiJMDwzVImBEmGvDNUiTDUTDXhhrv+yTVX6Xivpdq/o+EYFQRutxHFR4LuJ79nvmx9vSae6918Recp6QgEAgEAgEAgEAgEAgEAgEAgEDQa26q0aSp2X9S5AfRXgesh6H3l7vwmXHlw36MduPF8/NRen9CYjA3mnEJstxVhvSxfeQ8x8xznPjh4e3TlqvGTWEw5oma1Ew14YaiTNaiYU8MNRMDYav6Gtx+KrwtI9aw72yOzXWPasbuA+O4c4ddWu55cR9KaF0VVg8NVhqRlXUuQ6seLO3Ukkky3s44zGcRnQoQCAQCAQCAQCAQCAQCAQCAQCAQNdp3QmHx1BpxCbanercHrb30bkf6OYmWcuezXjsx7clHa46mYnRrliPS4Zjkl4G4dFsH2W+R5dBFnDx9/S5arz7OXMPmeGGomGvDNaiYaiYanRS9jrXWpd3YKiAZszHcAB1hWONt4j6C7PNUF0Zhs3ybF3gG9xvCjlUh6DrzPllUj19Gma8fq62a7iAQCAQCAQCAQCAQCAQCAQCAQCAQCBC6lXRkdQ6OCrIwBVlPEEHiIZZLOKqvXHstPrX6O7y2FZuH/AImP8LfHgJFx+Tz9/Rc+uv8AJVuIpet2SxGrdDkyMpVlPQg7xMedcbLxSjNESYa8MNNwWDtvtWqmtrbXOSooJY/yHfwELxwuV4i8uzvUFNHgYjEZWY1huy3ph1PFUPNjzbyG7MmpHqaOnmv1vl3U19IgEAgEAgEAgEAgEAgEAgEAgEAgEAgEAgEDUaf1awePXLE0h2AyWwerYng435d3CZZy556sc/vRW+sPZVVQhspxjhB9h6lZv3lIHymcPjz6LGesqtbcNs3ei2s/Wy2svymPh7eMuFkas9ldWIRbbsW5Q5fVpUqN+8xP4TeH36+jxvras3QWr2DwCbGGoWvPLafjY/3nO8+HCVw+zDXjh92NpCxAIBAIBAIBAIBA/9k=" alt="" />
                  </div>
                  <div className="text-blue-700 font-medium text-lg">Ngân hàng VCB - NH TMCP Ngoai Thuong Viet Nam</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4 bg-white border rounded-sm">
        <div className="w-full">
          <div className="text-2xl font-semibold mb-4">Lịch Sử Rút Tiền</div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Ngày Rút</TableHead>
                  <TableHead>Số Tiền</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyDraws.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.id}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{formattedPrice(+record.cash)}</TableCell>
                    <TableCell className="">Thành Công</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 items-center text-sm">
              Chọn
              <Select value={limit.toString()} onValueChange={(v) => {
                setLimit(+v);
                setPage(1);
              }}>
                <SelectTrigger className="w-[60px]">
                  <SelectValue placeholder={limit} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {pages.length > 3 && (
              <Pagination className="flex justify-end">
                <PaginationContent>
                  {[...pages].shift().url && (
                    <PaginationItem onClick={() => setPage(page - 1)}>
                      <PaginationPrevious />
                    </PaginationItem>
                  )}

                  {pages.slice(1, pages.length - 1).map((p: any, index: number) => (
                    <PaginationItem key={index} onClick={() => setPage(p.label)} className="cursor-pointer">
                      <PaginationLink isActive={+p.label === +page}>{p.label}</PaginationLink>
                    </PaginationItem>
                  ))}

                  {/* <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem> */}
                  {[...pages].pop().url && (
                    <PaginationItem onClick={() => setPage(page + 1)}>
                      <PaginationNext />
                    </PaginationItem>
                  )}

                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
