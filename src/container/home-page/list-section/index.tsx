"use client";

import { UpdateCartDrawer } from "@/components/drawer/update-cart-drawer";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
import { cn, formatToIDR } from "@/lib/utils";
import { useCartStore } from "@/providers/cart-store-provider";
import { useState } from "react";

import { toast } from "sonner";

export function ListSection() {
  const { items, removeItem } = useCartStore((state) => state);

  const [openDrawerId, setOpenDrawerId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {items.length > 0 ? (
        <Table>
          <TableCaption>
            Jumlah item yang ada di dalam list ({items.length}) <br />
            Klik kanan / Long press item untuk untuk melihat opsi lainnya.
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
            {items.length > 0 ? (
              items.map((item) => (
                <ContextMenu
                  key={item.id}
                  onOpenChange={(open) => {
                    if (!open) {
                      setOpenDrawerId(null);
                    }
                  }}
                >
                  <ContextMenuTrigger asChild>
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatToIDR(item.price)}</TableCell>
                      <TableCell className="text-right">
                        {formatToIDR(item.total)}
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <UpdateCartDrawer
                      item={item}
                      isOpen={openDrawerId === item.id}
                      onOpenChange={(open) =>
                        setOpenDrawerId(open ? item.id : null)
                      }
                    >
                      <div className="w-full">
                        <Button
                          className={cn(
                            "block w-full text-sm text-left relative cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          )}
                          variant="ghost"
                          size="sm"
                        >
                          Update
                        </Button>
                      </div>
                    </UpdateCartDrawer>

                    <ContextMenuItem
                      onClick={() => {
                        removeItem(item.id);

                        toast.success("Success", {
                          description: "Item berhasil dihapus dari list.",
                          action: {
                            label: "Tutup",
                            onClick: () => {
                              console.log("Toast closed");
                            },
                          },
                        });
                      }}
                      className="text-red-500"
                    >
                      Hapus
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
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
                {formatToIDR(
                  items.reduce((total, item) => total + item.total, 0)
                )}
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
