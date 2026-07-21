import { auth } from '@/app/lib/auth';
import { PlusIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssuesActions = async () => {
  const session = await auth();

  return (
    <div className="flex items-center justify-between gap-3">
      <IssueStatusFilter />
      {session && (
        <Link
          href="/issues/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <PlusIcon className="w-4 h-4" />
          New Issue
        </Link>
      )}
    </div>
  );
};

export default IssuesActions;
