import JobSingle from "@/components/JobSingle";
import prisma from "@/server/db/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "@/app/admin/AdminSidebar";
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await prisma.job.findUnique({
    where: {
      slug,
    },
  });
  if (!job) notFound();
  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobSingle job={job}></JobSingle>
      <AdminSidebar job={job} />
    </main>
  );
}
