import React from 'react';
import Link from 'next/link';

const courses = [
  {
    id: 1,
    title: 'Khóa học Bán hàng Online',
    image: '/images/course-thumbnail.png',
    description: 'Tuyệt chiêu nâng doanh số bán hàng Facebook từ dưới lên trên',
    price: '599.000đ',
    originalPrice: '1.500.000đ',
  },
  // Thêm các khóa học khác vào đây
];

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-blue-600 font-bold">{course.price}</span>
        <span className="text-gray-400 line-through text-sm">{course.originalPrice}</span>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Xem chi tiết
      </button>
    </div>
  </div>
);

const CoursesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex">
      {/* Sidebar */}
      <div className="w-1/4 pr-8">
        <h2 className="text-xl font-bold mb-4">Khóa Học</h2>
        <ul className="space-y-2">
          <li><Link href="#" className="text-blue-600 hover:underline">Bán hàng Online</Link></li>
          <li><Link href="#" className="text-blue-600 hover:underline">Marketing Online</Link></li>
          <li><Link href="#" className="text-blue-600 hover:underline">Thiết kế đồ họa</Link></li>
          {/* Thêm các danh mục khóa học khác */}
        </ul>
      </div>

      {/* Main content */}
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-8">Khóa học Bán hàng Online</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <Link href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </Link>
            <Link href="#" className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </Link>
            {/* Add more pagination links as needed */}
            <Link href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
