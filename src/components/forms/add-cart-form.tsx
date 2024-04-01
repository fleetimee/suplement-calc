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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { MoneyInput } from "@/components/money-input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

type Inputs = z.infer<typeof addCartSchema>;

interface AddCartFormProps {
  className: React.ComponentProps<"form">["className"];
}

export function AddCartForm({ className }: AddCartFormProps) {
  const id = useId();

  const { addItem, total } = useCartStore((state) => state);

  const form = useForm<Inputs>({
    resolver: zodResolver(addCartSchema),
    defaultValues: {
      id: id,
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
    },
  });

  function totalItems() {
    const quantity = form.watch("quantity");
    const price = form.watch("price");

    const total = quantity * price;

    form.setValue("total", total);

    const half = 300000 / 2;
    const threeQuarters = 300000 * 0.75;

    if (total >= half && total < threeQuarters) {
      toast("Warning", {
        description: "Total is more than half of the limit.",
      });
    } else if (total >= threeQuarters && total < 300000) {
      toast("Warning", {
        description: "Total is more than 75% of the limit.",
      });
    } else if (total >= 300000) {
      toast("Warning", {
        description: "Total has reached the limit.",
      });
    }
  }

  useEffect(() => {
    totalItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("quantity"), form.watch("price")]);

  function onSubmit(data: Inputs) {
    try {
      // Addition total now plus new total and then check if it's more than 300000
      const newTotal = total + data.total;

      if (newTotal >= 300000) {
        toast("Warning", {
          description: "Total has reached the limit. Cannot add more items.",
        });
        return;
      }

      addItem(data);

      const half = 300000 / 2;
      const threeQuarters = 300000 * 0.75;

      if (newTotal >= half && newTotal < threeQuarters) {
        toast("Warning", {
          description: "Total is more than half of the limit.",
        });
      } else if (newTotal >= threeQuarters && newTotal < 300000) {
        toast("Warning", {
          description: "Total is more than 75% of the limit.",
        });
      }

      toast("Success", {
        description: "Item berhasil ditambahkan ke dalam list.",
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
                      e.target.value === "" ? 0 : Number(e.target.value);
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

          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Form>
  );
}
