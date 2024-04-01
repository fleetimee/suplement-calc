"use client";

import {
  Bookmark,
  Calculator,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useCartStore } from "@/providers/cart-store-provider";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface RoutePathProps {
  path: string;
  name: string;
  icon: React.ReactNode;
}

const routePaths: RoutePathProps[] = [
  { path: "/", name: "Track", icon: <Calculator className="h-5 w-5" /> },
  { path: "/saved", name: "Saved", icon: <Bookmark className="h-5 w-5" /> },
  { path: "/about", name: "About", icon: <Users2 className="h-5 w-5" /> },
];

export function MobileNavbar() {
  const { total } = useCartStore((state) => state);

  const progress = (total / 300000) * 100;

  // Check current route and set active class
  const path = usePathname();

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 justify-between border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet open={open} onOpenChange={setOpen} defaultOpen={false}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            {routePaths.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn("flex items-center gap-4 px-2.5", {
                  "text-foreground": path === route.path,
                  "text-muted-foreground hover:text-foreground":
                    path !== route.path,
                })}
              >
                {route.icon}
                {route.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <h1
        className={cn("text-lg font-semibold tracking-tight", {
          "text-red-500": total >= 300000,
          "text-orange-500": total < 300000 && total >= 300000 * 0.75,
          "text-yellow-500": total < 300000 * 0.75 && total >= 300000 * 0.5,
          "text-green-500": total < 300000 * 0.5,
        })}
      >
        Rp. {new Intl.NumberFormat("id-ID").format(total)}
      </h1>

      <Progress value={progress} className="w-[50%]" />
    </header>
  );
}
