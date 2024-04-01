import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export function FloatingActionButton() {
  return (
    <Button className="fixed bottom-4 right-4 p-4 bg-primary  rounded-full shadow-lg text-white">
      <Plus className="h-2 w-2" />
    </Button>
  );
}
