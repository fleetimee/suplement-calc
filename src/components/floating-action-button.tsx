import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export function FloatingActionButton() {
  return (
    <Button className="fixed bottom-4 right-4 p-8 bg-primary rounded-full shadow-lg text-white flex items-center justify-center">
      <Plus className="h-6 w-6" />
    </Button>
  );
}
