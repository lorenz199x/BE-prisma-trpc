import * as dotenv from 'dotenv'
dotenv.config() // Load the environment variables
import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const job = await prisma.job.findMany()

// console.log(`The connection URL is ${process.env.DATABASE_URL}`)

    // const job = await prisma.job.create({
    //   data: {
    //     title: "kotlin developer",
    //     description: "onsite hybrid",
    //   company: "AB Company",
    //   location: "Manila",
    //   postedDate: new Date,
    //   requirements: 'anything',
    //   skills: 'kotlin',
    //   salaryRange: "100",
    //   candidates: "test",
    //   JobDetail: {
    //       // jobId: 123,
    //       // job: "kotline developer",
    //       // responsibilities: 'develop',
    //       // qualifications: 'nice',
    //       // applicationProcess: 'ongoing'
    //   }

    //   },
    // });
  console.log(job);

}

main()
  // .then(async () => {
  //   await prisma.$disconnect();
  // })
  // .catch(async (e) => {
  //   console.error(e);
  //   await prisma.$disconnect();
  //   process.exit(1);
  // });
  .catch(e => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
