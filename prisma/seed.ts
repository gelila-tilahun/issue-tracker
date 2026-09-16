import { PrismaClient } from "../app/generated/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.issue.createMany({
    data: [
      {
        title: "Network outage in Addis Ababa",
        description: "Customers are experiencing intermittent network connectivity.",
        status: "OPEN",
      },
      {
        title: "Slow internet connection",
        description: "Users reported reduced internet speed during peak hours.",
        status: "IN_PROGRESS",
      },
      {
        title: "SIM registration issue",
        description: "Some customers are unable to complete SIM registration.",
        status: "OPEN",
      },
      {
        title: "Mobile app login failure",
        description: "Customers are unable to log into the mobile application.",
        status: "CLOSED",
      },
      {
        title: "Billing information not updated",
        description: "Customer billing information is not reflected correctly.",
        status: "OPEN",
      },
      {
        title: "Customer service response delay",
        description: "Customers reported delays when contacting customer support.",
        status: "IN_PROGRESS",
      },
      {
        title: "Data package activation failure",
        description: "Some customers cannot activate purchased data packages.",
        status: "OPEN",
      },
      {
        title: "Incorrect account balance",
        description: "The displayed account balance does not match the actual balance.",
        status: "IN_PROGRESS",
      },
      {
        title: "USSD service unavailable",
        description: "USSD services are temporarily unavailable for some users.",
        status: "CLOSED",
      },
      {
        title: "SMS delivery problem",
        description: "Customers are experiencing delays in receiving SMS messages.",
        status: "OPEN",
      },
      {
        title: "Employee portal access issue",
        description: "Staff members are unable to access the employee portal.",
        status: "IN_PROGRESS",
      },
      {
        title: "Password reset not working",
        description: "The password reset function is not sending reset instructions.",
        status: "OPEN",
      },
      {
        title: "Customer information duplication",
        description: "Duplicate customer records were identified in the system.",
        status: "IN_PROGRESS",
      },
      {
        title: "Payment processing failure",
        description: "Some customer payments are failing to process.",
        status: "OPEN",
      },
      {
        title: "Internet package expiration error",
        description: "Some packages are expiring earlier than expected.",
        status: "OPEN",
      },
      {
        title: "Employee attendance record issue",
        description: "Attendance records are not being displayed correctly.",
        status: "CLOSED",
      },
      {
        title: "System notification failure",
        description: "Important system notifications are not reaching users.",
        status: "IN_PROGRESS",
      },
      {
        title: "Customer complaint tracking issue",
        description: "Some submitted complaints are missing from the tracking system.",
        status: "OPEN",
      },
      {
        title: "Service activation delay",
        description: "Newly requested services are taking too long to activate.",
        status: "IN_PROGRESS",
      },
      {
        title: "Staff account permissions issue",
        description: "Some staff accounts have incorrect system permissions.",
        status: "OPEN",
      },
    ],
  });

  console.log("20 issues successfully created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });