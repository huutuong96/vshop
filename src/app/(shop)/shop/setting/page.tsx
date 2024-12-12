import React, { useState } from 'react';

const ShopInfoPage = () => {
  const [activeTab, setActiveTab] = useState<string>('basic'); // Để quản lý tab hiện tại
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => handleTabChange('basic')}
          className={`py-2 px-6 text-sm font-semibold ${activeTab === 'basic' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
        >
          Thông tin cơ bản
        </button>
        <button
          onClick={() => handleTabChange('tax')}
          className={`py-2 px-6 text-sm font-semibold ${activeTab === 'tax' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
        >
          Thông tin Thuế
        </button>
        <button
          onClick={() => handleTabChange('identity')}
          className={`py-2 px-6 text-sm font-semibold ${activeTab === 'identity' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
        >
          Thông tin Định Danh
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'basic' && (
          <div>
            <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Tên Shop</h3>
                  <p>Phụ Kiện Thời Trang 4T</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Logo của Shop</h3>
                <div className="flex items-center">
                  <img
                    src="/path-to-logo.jpg" // Link tới ảnh logo
                    alt="Shop Logo"
                    className="w-20 h-20 object-cover rounded-full mr-4"
                  />
                  <div>
                    <p className="text-xs">Kích thước hình ảnh tiêu chuẩn: Chiều rộng 300px, Chiều cao 300px</p>
                    <p className="text-xs">Dung lượng file tối đa: 2.0MB</p>
                    <p className="text-xs">Định dạng file được hỗ trợ: JPG, JPEG, PNG</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold">Mô tả Shop</h3>
                <p>
                  Shop chuyên cung cấp các phụ kiện thời trang với mẫu mã đa dạng, chất lượng tốt nhất cho người tiêu dùng.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tax' && (
          <div>
            <h2 className="text-lg font-semibold">Thông tin Thuế</h2>
            {/* Nội dung thông tin Thuế */}
            <p>Thông tin thuế của shop sẽ hiển thị tại đây.</p>
          </div>
        )}

        {activeTab === 'identity' && (
          <div>
            <h2 className="text-lg font-semibold">Thông tin Định Danh</h2>
            {/* Nội dung thông tin Định Danh */}
            <p>Thông tin định danh của shop sẽ hiển thị tại đây.</p>
          </div>
        )}
      </div>

      {/* Footer buttons */}
      <div className="flex justify-between mt-6">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-md">Xem Shop của tôi</button>
        <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-md">Chỉnh sửa</button>
      </div>
    </div>
  );
};

export default ShopInfoPage;