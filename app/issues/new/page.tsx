import IssueForm from "@/app/issues/_components/IssueFormClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Issue",
  description: "Create a new issue",
};

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
