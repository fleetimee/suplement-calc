import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateTodayDate } from "@/lib/utils";
import { ChevronLeft, ShoppingCart } from "lucide-react";

export default function IndexPage() {
  const groceries = [
    {
      id: 1,
      name: "Sereal",
      price: 20000,
      quantity: 1,
    },
    {
      id: 2,
      name: "Susu",
      price: 30000,
      quantity: 1,
    },
    {
      id: 3,
      name: "Buah",
      price: 50000,
      quantity: 1,
    },
  ];

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-start gap-1  ">
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Supplemen Cart
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
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {groceries.map((grocery, index) => (
          <div key={index} className="flex justify-between items-center">
            <p>{grocery.name}</p>
            <p>{`Rp. ${grocery.price}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
