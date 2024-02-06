"use server";

import prisma from "@/server/db/prisma";
import { JobResultsProps } from "@/types/jobTypes";
import { Job, Prisma } from "@prisma/client";

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
