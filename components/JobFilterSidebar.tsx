import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "@/components/ui/select";

export const filterJob = async () => {
  "use server";
};
export default async function JobFilterSidebar() {
  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJob}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              type="text"
              placeholder="Title, company, etc."
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">All Locations</option>
            </Select>
          </div>
        </div>
      </form>
    </aside>
  );
}
