"use server";

import prisma from "@/server/db/prisma";
export const getJob = async () => {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    console.log(error);
  }
};
