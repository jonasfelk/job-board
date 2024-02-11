import JobSingle from "@/components/JobSingle";
import { Button } from "@/components/ui/button";
import { getSingleJob } from "@/server/actions/job.action";
import prisma from "@/server/db/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    slug: string;
  };
}
export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      slug: true,
    },
  });

  return jobs.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getSingleJob(slug);
  return {
    title: job.title,
  };
}
export default async function Page({ params: { slug } }: PageProps) {
  const job = await getSingleJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.log("Job does not have an application link");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobSingle job={job} />
      <aside>
        <Button asChild>
          <a
            href={applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-40 md:w-fit"
          >
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}
