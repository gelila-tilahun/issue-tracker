import Pagination from "./components/Pagination";

interface Props {
  // searchParams must be a Promise in newer Next.js versions
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  // 1. Await the incoming search parameters safely
  const resolvedParams = await searchParams;

  // 2. Fall back to page '1' if the parameter is undefined or missing in the URL
  const currentPage = parseInt(resolvedParams.page || '1', 10);

  return (
    <div className="p-4">
      {/* 3. Pass the validated page integer down to the Pagination component */}
      <Pagination 
        itemCount={100} 
        pageSize={10} 
        currentPage={isNaN(currentPage) ? 1 : currentPage} 
      />
    </div>
  );
}