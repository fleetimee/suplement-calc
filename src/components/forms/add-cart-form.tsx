"use client";

import { addCartSchema } from "@/schema/add-cart";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/providers/cart-store-provider";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import MoneyInput from "../money-input";
import { Button } from "../ui/button";

type Inputs = z.infer<typeof addCartSchema>;

interface AddCartFormProps {
  className: React.ComponentProps<"form">["className"];
}

export function AddCartForm({ className }: AddCartFormProps) {
  const id = useId();

  const { addItem } = useCartStore((state) => state);

  const form = useForm<Inputs>({
    resolver: zodResolver(addCartSchema),
    defaultValues: {
      id: id,
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
    },
  });

  function onSubmit(data: Inputs) {
    try {
      addItem(data);
    } catch (error) {
      console.error(error);
    }
  }

  function totalItems() {
    const quantity = form.watch("quantity");
    const price = form.watch("price");

    const total = quantity * price;

    form.setValue("total", total);
  }

  useEffect(() => {
    totalItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("quantity"), form.watch("price")]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nama Item</FormLabel>
                <FormControl>
                  <Input {...field} id="name" placeholder="Ultra Milk 10ml" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="quantity">Jumlah</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="quantity"
                    type="tel"
                    value={Number(field.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <MoneyInput
            form={form}
            name="price"
            label="Harga"
            placeholder="Rp 10.000"
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="total"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="total">Total</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="total"
                    placeholder="Rp 30.000"
                    type="text"
                    value={new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(field.value)}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Form>
  );
}
