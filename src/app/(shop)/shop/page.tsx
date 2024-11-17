import DashboardContent from "@/app/(shop)/_components/dashboard-content";

const status = [
  'Tất cả', 'Chờ xác nhận', 'Chờ Lấy hàng', 'Đang giao', 'Đã giao', 'Đơn hủy', 'Trả hàng/hoàn tiền', 'Giao không thành công'
]

const filters = [
  {
    id: '0',
    name: 'Mã đơn hàng',
    placehoder: 'Nhập mã đơn hàng'
  }, {
    id: '1',
    name: 'Mã vận đơn',
    placehoder: 'Nhập mã vận đơn'
  }, {
    id: '2',
    name: 'Tên người mua',
    placehoder: 'Nhập tên người mua'
  }, {
    id: '3',
    name: 'Sản phẩm',
    placehoder: 'Nhập tên sản phẩm/SKU'
  }
];

export default function ShopPage() {
  return (
    <div className="overflow-auto">
      <DashboardContent />
    </div>
  )
}
