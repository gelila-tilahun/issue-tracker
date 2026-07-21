import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@/app/generated/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading size="6" mb="2">{issue.title}</Heading>
      <Flex align="center" gap="3" mb="4">
        <IssueStatusBadge status={issue.status} />
        <Text size="2" color="gray">
          Created on{' '}
          {issue.createdAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </Flex>
      <Card className="prose prose-sm max-w-none p-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
