import JobListItem from "@/components/JobListItem";
import { getJob } from "@/server/actions/job";
import { JobResultsProps } from "@/types/jobTypes";

export default async function JobResults(filterValues: JobResultsProps) {
  const jobs = await getJob(filterValues);

  return (
    <div className="grow space-y-4">
      {jobs?.map((job) => <JobListItem key={job.id} job={job} />)}
      {jobs?.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters
        </p>
      )}
    </div>
  );
}
