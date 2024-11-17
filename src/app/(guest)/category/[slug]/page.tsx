import Link from 'next/link';
import React from 'react';

const CategorySlug = () => {
  return (
    <div>
      <Link href={'/category'}>Quay về danh mục chính</Link>
      Đây là trang slug
    </div>
  );
};

export default CategorySlug;