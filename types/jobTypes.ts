import { JobFilterSchema } from "@/lib/validation";

export type PageProps = {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
};
export type JobResultsProps = {
  filterValues: JobFilterSchema;
};

export type JobFilterSidebarProps = {
  defaultValues: JobFilterSchema;
};
