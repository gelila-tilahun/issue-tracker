"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/new/loading";

const IssueForm = dynamic(
  () => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

export default IssueForm;
