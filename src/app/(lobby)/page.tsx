"use client";

import { ListSection } from "@/container/home-page/list-section";
import { TitleSection } from "@/container/home-page/title-section";

export default function IndexPage() {
  return (
    <main className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <TitleSection />
      <ListSection />
    </main>
  );
}
