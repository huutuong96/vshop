import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import CourseCard from '@/app/(guest)/_components/card-product'; // Đảm bảo đường dẫn này chính xác

const courses = [
  {
    id: 1,
    title: 'Khóa học Bán hàng Online',
    image: 'https://cf.shopee.vn/file/vn-11134207-7r98o-lmzxvxvxvxvxvx',
    excerpt: 'Tuyệt chiêu nâng doanh số bán hàng Facebook từ dưới lên trên',
    price: '599.000đ',
    originalPrice: '1.500.000đ',
    category: 'Bán hàng Online',
    author: 'Nguyễn Văn A',
    slug: 'khoa-hoc-ban-hang-online'
  },
  // Thêm các khóa học khác tương tự
];

const CoursesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex">
      {/* Sidebar */}
      <div className="w-1/4 pr-8">
        <h2 className="text-xl font-bold mb-4">Khóa Học</h2>
        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <Link href="#" className="text-blue-600 hover:underline">Bán hàng Online</Link>
            <ChevronRight size={16} />
          </li>
          <li className="flex items-center justify-between">
            <Link href="#" className="text-gray-600 hover:underline">Marketing Online</Link>
            <ChevronRight size={16} />
          </li>
          <li className="flex items-center justify-between">
            <Link href="#" className="text-gray-600 hover:underline">Thiết kế đồ họa</Link>
            <ChevronRight size={16} />
          </li>
          {/* Thêm các danh mục khóa học khác */}
        </ul>
      </div>

      {/* Main content */}
      <div className="w-3/4">
        <div className="mb-8">
          <img src="/images/course-banner.png" alt="Khóa học Bán hàng Online" className="w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
        
        {/* Featured Course */}
        <div className="bg-orange-100 p-6 rounded-lg mb-8 flex">
          <img src="/images/featured-instructor.png" alt="Instructor" className="w-1/3 rounded-lg mr-6" />
          <div>
            <h3 className="text-xl font-bold mb-2">Giảng viên tiêu biểu</h3>
            <p className="text-gray-600 mb-4">Thông tin về giảng viên và khóa học đặc biệt...</p>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            {[1, 2, 3, 4, 5].map((page) => (
              <Link key={page} href="#" className={`px-3 py-2 border border-gray-300 ${page === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} text-sm font-medium hover:bg-gray-50`}>
                {page}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
