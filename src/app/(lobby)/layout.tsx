import { AddCartDrawer } from "@/components/drawer/add-cart-drawer";
import { FloatingActionButton } from "@/components/floating-action-button";
import { MobileNavbar } from "@/components/mobile-navbar";
import React from "react";

interface IndexLayoutProps {
  children: React.ReactNode;
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40  items-center">
      <div className="w-full max-w-2xl">
        {/* <NavigationSidebar /> */}

        <div className="flex flex-col sm:gap-9 sm:py-8 sm:pl-14">
          <MobileNavbar />

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
        <AddCartDrawer>
          <FloatingActionButton />
        </AddCartDrawer>
      </div>
    </div>
  );
}
