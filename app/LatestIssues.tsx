import prisma from '@/prisma/client';
import { Avatar, Card, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueStatusBadge } from './components';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      assignedToUser: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
  });

  return (
    <Card>
      <Heading size="4" mb="4">Latest Issues</Heading>
      <Flex direction="column" gap="3">
        {issues.map((issue) => (
          <Flex key={issue.id} justify="between" align="center" className="py-2 border-b border-gray-100 last:border-0">
            <Flex direction="column" gap="1">
              <Link
                href={`/issues/${issue.id}`}
                className="text-sm font-medium hover:text-green-600 transition-colors"
              >
                {issue.title}
              </Link>
              <Flex align="center" gap="2">
                <IssueStatusBadge status={issue.status} />
                <Text size="1" color="gray">
                  {issue.createdAt.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
              </Flex>
            </Flex>
            {issue.assignedToUser && (
              <Avatar
                src={issue.assignedToUser.image!}
                fallback={issue.assignedToUser.name?.[0]?.toUpperCase() ?? '?'}
                size="2"
                radius="full"
                title={issue.assignedToUser.name ?? undefined}
              />
            )}
          </Flex>
        ))}
        {issues.length === 0 && (
          <Text size="2" color="gray" className="text-center py-4">
            No issues yet.
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default LatestIssues;
