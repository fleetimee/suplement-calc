"use client";

import { Button } from "@/components/ui/button";

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
import { useCartStore } from "@/providers/cart-store-provider";

export default function IndexPage() {
  const { items, addItem } = useCartStore((state) => state);

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-start gap-1  ">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            SuppleTrack
          </h1>
          <p
            className="text-sm text-muted-foreground
            sm:grow-0 sm:shrink-0 sm:mt-0 sm:mb-2 sm:text-sm sm:text-left sm:leading-5 sm:tracking-tight sm:text-muted-foreground max-w-[36rem]
          "
          >
            List semua kebutuhan supplemen bulananmu disini, mulai dari sereal,
            susu, buah maksimal Rp. 300.000
          </p>
        </div>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" className="hidden">
            Discard
          </Button>
          <Button
            size="sm"
            onClick={() =>
              void addItem({
                id: "1",
                name: "Item 1",
                price: 100,
                quantity: 1,
              })
            }
          >
            Print
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nama</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className="text-right">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
