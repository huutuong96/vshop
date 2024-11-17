import React from 'react';
const iconsCate: { title: string, img: string }[] = [
  {
    title: 'Dụng cụ nhà bếp',
    img: 'https://salt.tikicdn.com/cache/280x280/ts/product/46/8d/67/acb5c4790cac42a96a3610694fdafb2c.jpg'
  },
  {
    title: 'Đồ dùng phòng ăn',
    img: 'https://salt.tikicdn.com/cache/280x280/ts/product/7c/da/b3/4828a68bf4864874b3f85eee932a051e.jpg'
  },
  {
    title: 'Nội thất',
    img: 'https://salt.tikicdn.com/ts/category/3e/7c/87/3fa07251f18022522fb9ddd1a5229727.png'
  },
  {
    title: 'Đồ dùng phòng ngủ',
    img: 'https://salt.tikicdn.com/ts/category/a8/fb/62/ea44ddedc741d8ce6fd8ce91d9a3f9dd.png'
  },
  {
    title: 'Trang trí nhà cửa',
    img: 'https://salt.tikicdn.com/assets/img/image.svg'
  },
  {
    title: 'Đèn & thiết bị chiếu sáng',
    img: 'https://salt.tikicdn.com/assets/img/image.svg'
  },
  {
    title: 'Ngoài trời & sân vườn',
    img: 'https://salt.tikicdn.com/ts/category/b9/6a/82/3d0a7abc24ecedcec5393a4be3652987.png'
  },
  {
    title: 'Đồ dùng và thiết bị nhà tắm',
    img: 'https://salt.tikicdn.com/cache/280x280/ts/product/19/d2/e5/1040b1edd4b2a1bdd94fbad01c1acf5b.jpg'
  },
  {
    title: 'Sửa chữa nhà cửa',
    img: 'https://salt.tikicdn.com/ts/category/30/2d/6c/790842bb7c68fd26ba8a1cdbaa1293d5.png'
  },
  {
    title: 'Nhạc cụ',
    img: 'https://salt.tikicdn.com/ts/category/be/94/fa/7d8dfe831201d08010f08cd805501772.png'
  },
  {
    title: 'Đồ thờ cúng',
    img: 'https://salt.tikicdn.com/cache/280x280/ts/product/86/35/f2/fc8550f75ce7c5f543e98857d59a68ae.jpg'
  },
  {
    title: 'Dụng cụ & Thiết bị tiện ích',
    img: 'https://salt.tikicdn.com/cache/280x280/ts/product/c7/d4/bc/cd2e25b4bf13d5536eb63d3b003d7cf7.jpg'
  }
];
const CategoriesIconGuest = () => {
  return (
    <div className="icons-cate-right-cate w-full h-[328px] mt-4 my-3">
      <div className="title-icon w-full h-[24px]">
        <h3 className='font-bold text-[18px] pl-2'>Khám phá theo danh mục</h3>
      </div>
      <div className="icon-content-cate grid grid-cols-6 w-full gap-3 py-4 ">
        {iconsCate.map(ic => (
          <div className='w-[150px] h-[140] flex flex-col items-center cursor-pointer' key={ic.title}>
            <img src={ic.img} className='w-[90px] h-[90px] rounded-[50px] bg-gray-300' />
            <span className='text-center'>{ic.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesIconGuest;