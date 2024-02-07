import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/h1";
import { JobFilterSchema } from "@/lib/validation";
import { HomeProps } from "@/types/jobTypes";
import { Metadata } from "next";

export const getTitle = ({ q, type, location, remote }: JobFilterSchema) => {
  const titlePrefix = q
    ? `${q} jobs `
    : type
      ? `${type} developer jobs `
      : remote
        ? "Remote developer jobs "
        : "All developer jobs ";

  const titleSuffix = location ? `in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
};

export const generateMetadata = ({
  searchParams: { q, type, location, remote },
}: HomeProps): Metadata => {
  return {
    title: `${getTitle({ q, type, location, remote: remote === "true" })} | Flow Jobs`,
  };
};
export default async function Home({
  searchParams: { q, type, location, remote },
}: HomeProps) {
  const filterValues: JobFilterSchema = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream developer job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
