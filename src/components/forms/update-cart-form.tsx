"use client";

import { useCartStore } from "@/providers/cart-store-provider";
import { updateCartSchema } from "@/schema/add-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { MoneyInput } from "@/components/money-input";
import { Button } from "../ui/button";
import { useEffect } from "react";

export type UpdateInputs = z.infer<typeof updateCartSchema>;

interface UpdateCartFormProps {
  className: React.ComponentProps<"form">["className"];
  item: UpdateInputs;
}

export function UpdateCartForm({ className, item }: UpdateCartFormProps) {
  const { updateItem, total } = useCartStore((state) => state);

  const form = useForm<UpdateInputs>({
    resolver: zodResolver(updateCartSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.total,
    },
  });

  function totalItems() {
    const quantity = form.watch("quantity");
    const price = form.watch("price");

    const total = quantity * price;

    form.setValue("total", total);

    const half = 300000 / 2;
    const threeQuarters = 300000 * 0.75;
  }

  useEffect(() => {
    totalItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("quantity"), form.watch("price")]);

  function onSubmit(data: UpdateInputs) {
    try {
      // Calculate the new total
      const newTotal = total + data.total;

      // Check if the new total exceeds the limit
      if (newTotal >= 300000) {
        toast.error("Error", {
          description:
            "Harga total sudah melebihi batas maksimal. Silahkan kurangi jumlah item.",
        });
        return;
      }

      // Update the item
      updateItem(data.id, data);

      // Show a success message
      toast.success("Success", {
        description: "Item berhasil diperbarui dalam list.",
        action: {
          label: "Tutup",
          onClick: () => {
            console.log("Toast closed");
          },
        },
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

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
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const value =
                      e.target.value === "" ? "" : Number(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

          <Button type="submit">Update</Button>
        </div>
      </form>
    </Form>
  );
}
