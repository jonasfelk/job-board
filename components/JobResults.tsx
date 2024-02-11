import JobListItem from "@/components/JobListItem";
import { cn } from "@/lib/utils";
import { JobFilterSchema } from "@/lib/validation";
import { getJob } from "@/server/actions/job.action";
import prisma from "@/server/db/prisma";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
export type JobResultsProps = {
  filterValues: JobFilterSchema;
  page?: number;
  take?: number;
  skip?: number;
};
export default async function JobResults({
  filterValues,
  page = 1,
}: JobResultsProps) {
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

  const jobsPromise = await getJob({ filterValues, skip, take: jobsPerPage });

  const countPromise = await prisma.job.count({
    where: {},
  });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="grow space-y-4">
      {jobs?.map((job) => (
        <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs?.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters
        </p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          filterValues={filterValues}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterSchema;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, type, location, remote },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible",
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible",
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
