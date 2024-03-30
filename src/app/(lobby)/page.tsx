import { generateTodayDate } from "@/lib/utils";

export default function IndexPage() {
  return (
    <h1 className="text-xl font-semibold text-foreground">
      Belanja Suplemen: {generateTodayDate()}
    </h1>
  );
}
