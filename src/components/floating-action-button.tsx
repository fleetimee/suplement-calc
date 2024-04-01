import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export function FloatingActionButton() {
  return (
    <Button className="fixed bottom-4 right-4 md:right-auto md:left-1/2 md:transform md:-translate-x-1/2 p-4 bg-primary rounded-lg shadow-lg text-white">
      <Plus className="h-6 w-6" />
    </Button>
  );
}
