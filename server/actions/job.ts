"use server";

import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import prisma from "@/server/db/prisma";
import { JobResultsProps } from "@/types/jobTypes";
import { Job, Prisma } from "@prisma/client";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import path from "path";

export const getJob = async ({
  filterValues: { q, type, location, remote },
}: JobResultsProps) => {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  try {
    const jobs: Job[] = await prisma.job.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });
    return jobs;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch jobs");
  }
};

export const getDistinctLocations = async () => {
  try {
    const locations = await prisma.job.findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
      distinct: ["location"],
    });

    return locations
      .map(({ location }) => location)
      .filter(Boolean) as string[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch jobs");
  }
};

export const createJobPosting = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());

  const {
    companyName,
    locationType,
    salary,
    title,
    type,
    applicationEmail,
    applicationUrl,
    companyLogo,
    description,
    location,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company-logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title,
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary, 10),
      approved: true,
    },
  });

  redirect("/job-submitted");
};
