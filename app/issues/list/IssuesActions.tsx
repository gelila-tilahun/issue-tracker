import { auth } from '@/app/lib/auth';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssuesActions = async () => {
  const session = await auth();

  return (
    <Flex justify="between">
      <IssueStatusFilter />
      {session && (
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      )}
    </Flex>
  );
};

export default IssuesActions;
