
let categories = [
  {
    title: 'TOP DEAL',
    img: 'https://salt.tikicdn.com/ts/upload/2f/52/8e/00ab5fbea9d35fcc3cadbc28d7c6b14e.png'
  },
  {
    title: 'VNShop Trading',
    img: 'https://salt.tikicdn.com/ts/upload/72/8d/23/a810d76829d245ddd87459150cb6bc77.png'
  },
  {
    title: 'Coupon siêu hot',
    img: 'https://salt.tikicdn.com/ts/upload/8b/a4/9f/84d844f70e365515b6e4e3e745dac1d5.png'
  },
  {
    title: 'Xả kho giảm nửa giá',
    img: 'https://salt.tikicdn.com/ts/upload/a5/d8/06/cb6ff520f12973013c81a8b14ad5e5b3.png'
  },
  {
    title: 'Hàng ngoại giá hot',
    img: 'https://salt.tikicdn.com/ts/upload/cf/46/d1/e474a9eb803909a59927600ee64ddd4f.png'
  },
  {
    title: 'Cùng mẹ chăm bé',
    img: 'https://salt.tikicdn.com/cache/750x750/ts/upload/d7/b9/cf/185c3ea4d118574d7927f3d191575445.jpg'
  },
  {
    title: 'VNShop sach',
    img: 'https://salt.tikicdn.com/cache/750x750/ts/upload/28/52/b2/e77e55676a38e02c5ac7242cc43f46dc.jpg'
  },
  {
    title: 'Thế giới công nghệ',
    img: 'https://salt.tikicdn.com/cache/750x750/ts/upload/25/a7/1f/5538b19e95600da86e1241082fb631bf.jpg'
  },
  {
    title: 'Yêu bếp nghiện nhà',
    img: 'https://salt.tikicdn.com/cache/750x750/ts/upload/03/f9/44/343e3b73c1e600e3c16b97843dc04bb1.jpg'
  },
  {
    title: 'Khỏe đẹp toàn diện',
    img: 'https://salt.tikicdn.com/cache/750x750/ts/upload/ea/d3/81/a4ed0166b6abb19c3cfa3a48fadafd02.jpg'
  }
]

export default function Categories2() {
  return (
    <div className="w-full flex justify-between my-4">
      {categories.map(item => (
        <div key={item.title} className="w-25 flex flex-col items-center gap-3">
          <div className="size-[46px]">
            <img src={item.img} className="size-full object-cover rounded-lg" alt="" />
          </div>
          <div className="text-[13px] w-20 text-center font-medium">{item.title}</div>
        </div>
      ))}

    </div>
  )
}
