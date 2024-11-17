import React from 'react';
const titleCates: string[] = ["Cho bạn", "Đồ dùng nhà bếp", "Vệ sinh nhà cửa", "Đầm,váy", "Áo nữ", "Hoa, Cây cảnh"];
const cateItems: { title: string, img: string }[] = [
  {
    title: 'Siêu thị Sendo Farm',
    img: 'https://media3.scdn.vn/img4/2024/06_06/NnypLqLfnhMHFLEkqAsF.png'
  },
  {
    title: 'Cơn lốc điện tử',
    img: 'https://media3.scdn.vn/img4/2024/06_06/Xpp3l47T46MkEofrNifw.png'
  },
  {
    title: 'Thiết bị nhà bếp từ 39K',
    img: 'https://media3.scdn.vn/img4/2024/06_06/P6DV4nqEwYmWgOyDSrrS.png'
  },
  {
    title: 'Tiện ích phòng ngủ',
    img: 'https://media3.scdn.vn/img4/2024/06_06/tvuSBab7RyEhozsG1rxg.png'
  },
  {
    title: 'Bảo vệ sức khỏe',
    img: 'https://media3.scdn.vn/img4/2024/06_06/7ueYFpELz3FDRs39fUK6.png'
  },
  {
    title: 'Bình giữ nhiệt -49%',
    img: 'https://media3.scdn.vn/img4/2024/06_06/bMDPee2x1jUEZam75r6Q.png'
  },
  {
    title: 'Nạp thẻ & dịch vụ',
    img: 'https://media3.scdn.vn/img4/2024/06_06/h8GbHBAoO6sSZhBX4wbC.png'
  },
  {
    title: 'Mã giảm giá & Freeship',
    img: 'https://media3.scdn.vn/img4/2024/06_06/zKSfCBQwy8wugUH8rQ3u.png'
  }
]
const CategoriesGuest = () => {
  return (
    <div className="categories-home w-full">
      <div className="top w-full flex justify-between py-2">
        {titleCates.map(tl => (
          <div className="w-[180px] h-[46px] flex justify-center items-center border-b-4 border-b-blue-500" key={tl}>
            <span className="font-semibold text-blue-600">{tl}</span>
          </div>
        ))}
      </div>
      <div className="bottom flex justify-between w-full py-2">
        {cateItems.map(tl => (
          <div className="flex flex-col items-center w-[100px] gap-2" key={tl.title}>
            <img src={tl.img} className="size-[44px]" />
            <span className="text-[13px] text-center">{tl.title}</span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default CategoriesGuest;