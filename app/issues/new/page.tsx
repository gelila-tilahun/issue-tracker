
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

// Dynamically import IssueForm and provide a loading fallback 
const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'), 
  { 
    
    loading: () => <IssueFormSkeleton/>
    
  }
);

const NewIssuePage = () => {
  return (
    <IssueForm />
  );
};

export default NewIssuePage;