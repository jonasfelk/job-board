import { Metadata } from "next";
import NewJobForm from "@/app/jobs/new/NewJobForm";

export const metadata: Metadata = {
  title: "Post a new Job",
};

export default function Page() {
  return <NewJobForm />;
}
