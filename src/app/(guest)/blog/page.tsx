import Image from 'next/image';
import BlogPostCard from '@/app/(guest)/_components/BlogPostCard';

const blogPosts = [
  {
    image: 'https://cf.shopee.vn/file/vn-11134207-7r98o-lmzxvxvxvxvxvx',
    title: 'Tổng hợp 7+ review mặt nạ Foodaholic đáng mua nhất',
    excerpt: 'Review mặt nạ Foodaholic một cách chi tiết về thiết kế bao bì cũng như công dụng chăm sóc da ...',
    date: '19/09/2024',
    category: 'Chăm Sóc Da Mặt',
    author: 'Ngân Phạm',
    slug: 'review-mat-na-foodaholic'
  },
  {
    image: 'https://cf.shopee.vn/file/vn-11134207-7r98o-lmzxvxvxvxvxy',
    title: 'Mặt nạ Bioaqua có tốt không? Review chi tiết từng loại',
    excerpt: 'Mặt nạ Bioaqua được nhiều tín đồ làm đẹp yêu thích, nhưng liệu mặt nạ Bioaqua có tốt không? Bài ...',
    date: '18/09/2024',
    category: 'Chăm Sóc Da Mặt',
    author: 'Ngân Phạm',
    slug: 'review-mat-na-bioaqua'
  },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <img src="/images/logo.png" alt="VNSHOP News" className="h-12 w-auto" />
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-3/4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <BlogPostCard key={index} {...post} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/4 px-4 mt-8 lg:mt-0">
          {blogPosts.map((ad, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{ad.title}</h3>
              <img src={ad.image} alt={ad.title} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}