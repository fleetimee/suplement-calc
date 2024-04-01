import { Button } from "@/components/ui/button";

export function TitleSection() {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-start gap-1  ">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          SuppleTrack
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          List semua kebutuhan supplemen bulananmu disini, mulai dari sereal,
          susu, dan buah. maksimal Rp. 300.000
        </p>
      </div>

      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <Button variant="outline" size="sm" className="hidden">
          Discard
        </Button>
        <Button size="sm">Print</Button>
      </div>
    </div>
  );
}
