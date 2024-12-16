'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import envConfig from "@/config";
import { clientAccessToken } from "@/lib/http";
import { useEffect, useState } from "react";

interface WithdrawalRecord {
  id: string;
  date: string;
  amount: number;
  status: string;
}

const data: WithdrawalRecord[] = [
  { id: '1', date: '2024-12-01', amount: 1000, status: 'Completed' },
  { id: '2', date: '2024-11-25', amount: 1500, status: 'Pending' },
  { id: '3', date: '2024-11-18', amount: 2000, status: 'Completed' },
  { id: '4', date: '2024-11-10', amount: 500, status: 'Failed' },
];

export default function WithdrawalHistoryTable() {
  const [dataW, setDataW] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT_1}/api/shops/wallet/39`, {
          headers: {
            'Authorization': `Bearer ${clientAccessToken.value}`
          }
        });

      } catch (error) {

      }
    }
  }, [])
  return (
    <div className="overflow-x-auto">

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Withdrawal ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.amount}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
