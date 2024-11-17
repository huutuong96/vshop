import React from 'react';

const AboutPage = () => {
  return (
    <div className='w-full'>
      {/* Header section */}
      <div className="flex justify-center items-center mb-8">
        <img
          src="/images/logo.png"
          alt="VN Shop Logo"
          className="w-48 h-auto"
        />
      </div>

      {/* Mission statement */}
      <div className="mb-12">
        <h1 className='text-3xl font-bold text-[#0d69ff] text-center pb-4'>SỨ MỆNH VNSHOP</h1>
        <p className='text-lg leading-7 text-gray-700 max-w-4xl mx-auto text-center'>
          VN Shop là một sàn thương mại điện tử hiện đại, nơi kết nối hàng triệu người tiêu dùng và nhà bán lẻ trên toàn quốc. Với sứ mệnh mang đến trải nghiệm mua sắm trực tuyến an toàn, tiện lợi và đa dạng, VN Shop cung cấp một nền tảng cho phép người dùng dễ dàng tìm kiếm, so sánh và mua sắm từ hàng ngàn sản phẩm thuộc nhiều ngành hàng khác nhau như thời trang, điện tử, gia dụng, mỹ phẩm, và thực phẩm.
        </p>
      </div>

      {/* Key features or values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#0d69ff] mb-2">Đa dạng sản phẩm</h2>
          <p>Hàng triệu sản phẩm từ nhiều danh mục khác nhau</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#0d69ff] mb-2">Giao hàng nhanh chóng</h2>
          <p>Dịch vụ giao hàng nhanh và đáng tin cậy</p>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#0d69ff] mb-2">Hỗ trợ khách hàng 24/7</h2>
          <p>Đội ngũ hỗ trợ khách hàng luôn sẵn sàng phục vụ</p>
        </div>
      </div>

      {/* Additional information or history */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Lịch sử phát triển</h2>
          <p className="text-lg leading-7 text-gray-700 text-center">
            Được thành lập vào năm 20XX, VN Shop đã không ngừng phát triển và mở rộng để trở thành một trong những sàn thương mại điện tử hàng đầu tại Việt Nam. Chúng tôi cam kết tiếp tục đổi mới và cải tiến để mang lại trải nghiệm mua sắm tốt nhất cho khách hàng.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;