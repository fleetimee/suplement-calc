"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToIDR } from "@/lib/utils";
import { useCartStore } from "@/providers/cart-store-provider";

export function ListSection() {
  const { items } = useCartStore((state) => state);

  console.log(items.length);

  console.log(items);

  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 ? (
        <Table>
          <TableCaption>
            Jumlah item yang ada di dalam list ({items.length})
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nama</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{formatToIDR(item.price)}</TableCell>
              <TableCell className="text-right">
                {formatToIDR(item.price)}
              </TableCell>
            </TableRow>
          ))} */}

            {items.length > 0 ? (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatToIDR(item.price)}</TableCell>
                  <TableCell className="text-right">
                    {formatToIDR(item.price)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {formatToIDR(items.reduce((acc, item) => acc + item.price, 0))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="flex items-center justify-center h-screen py-10">
          <div className="text-center">No items found.</div>
        </div>
      )}
    </div>
  );
}
