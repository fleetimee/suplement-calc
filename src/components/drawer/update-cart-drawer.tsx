"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UpdateCartForm, UpdateInputs } from "../forms/update-cart-form";

interface UpdateCartDrawerProps {
  children: React.ReactNode;
  item: UpdateInputs;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateCartDrawer({
  children,
  item,
  isOpen,
  onOpenChange,
}: UpdateCartDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          console.log("onOpenChange", onOpenChange);
          onOpenChange(!isOpen);
        }}
      >
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Barang</DialogTitle>
            <DialogDescription>
              Perbarui barang yang ada di dalam list.
            </DialogDescription>
          </DialogHeader>
          <UpdateCartForm className="px-0" item={item} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update Barang</DrawerTitle>
          <DrawerDescription>
            Perbarui barang yang ada di dalam list.
          </DrawerDescription>
        </DrawerHeader>
        <UpdateCartForm className="px-4" item={item} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Batal</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
