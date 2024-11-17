import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AttributesTable() {
  return (
    <Table className="border p-2">
      <TableBody>
        <TableRow>
          <TableCell>Chất vải</TableCell>
          <TableCell>Cotton 2 chiều</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Phong cách</TableCell>
          <TableCell>Dễ thương</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kiểu áo</TableCell>
          <TableCell>Cổ tròn</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Họa tiết</TableCell>
          <TableCell>Trơn</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
