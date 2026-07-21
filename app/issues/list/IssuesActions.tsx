import { auth } from '@/app/lib/auth';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssuesActions = async () => {
  const session = await auth();

  return (
    <Flex justify="between" align="center">
      <IssueStatusFilter />
      {session && (
        <Button asChild>
          <Link href="/issues/new">
            <PlusIcon />
            New Issue
          </Link>
        </Button>
      )}
    </Flex>
  );
};

export default IssuesActions;
